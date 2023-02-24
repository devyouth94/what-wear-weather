import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

interface ExtendedRequest extends NextApiRequest {
  file: {
    location: string;
  };
}

const prisma = new PrismaClient();

const handler = nextConnect<ExtendedRequest, NextApiResponse>({
  onError(error, _, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const files = multer({
  storage: multerS3({
    s3: new S3Client({
      credentials: {
        accessKeyId: String(process.env.ACCESS_KEY_ID),
        secretAccessKey: String(process.env.SECRET_ACCESS_KEY),
      },
      region: 'ap-northeast-2',
    }),
    bucket: String(process.env.BUCKET_NAME),
    key(_, file, callback) {
      const date = String(
        new Intl.DateTimeFormat('ko-KR', {
          timeZone: 'Asia/Seoul',
          dateStyle: 'long',
          timeStyle: 'short',
        }).format(new Date()),
      );
      callback(null, `original/${date}_${file.originalname}`);
    },
  }),
});

handler.post(files.single('image'), async (req, res) => {
  const session: any = await getSession({ req });
  const userId = session.user.userId;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized', ok: false });
  }

  const { region, temp_now, temp_feels, temp_min, temp_max, description } = req.body;
  const image = req.file;

  try {
    await prisma.post.create({
      data: {
        region,
        temp_now: Number(temp_now),
        temp_feels: Number(temp_feels),
        temp_max: Number(temp_max),
        temp_min: Number(temp_min),
        image: image.location,
        description: description,
        user: {
          connect: { id: userId },
        },
        createdAt: String(
          new Intl.DateTimeFormat('ko-KR', {
            timeZone: 'Asia/Seoul',
            dateStyle: 'long',
            timeStyle: 'short',
          }).format(new Date()),
        ),
      },
    });

    res.status(200).json({ message: 'Post Successful!', ok: true });
  } catch (error) {
    res.status(500).json({ message: 'Prisma Error', ok: false });
  }
});

handler.get(async (req, res) => {
  const session: any = await getSession({ req });
  const userId = session.user.userId;
  const { min, max } = req.query;

  if (min && max) {
    try {
      const searchedPosts = await prisma.post.findMany({
        where: {
          userId,
          temp_now: {
            gte: Number(min),
            lte: Number(max),
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      res.status(200).json({ result: searchedPosts, message: 'Get Successful!', ok: true });
    } catch (error) {
      res.status(500).json({ message: 'Prisma Error', ok: false });
    }
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({ result: posts, message: 'Get Successful!', ok: true });
  } catch (error) {
    res.status(500).json({ message: 'Prisma Error', ok: false });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
