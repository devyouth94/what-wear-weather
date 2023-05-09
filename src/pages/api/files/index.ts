import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getSession } from 'next-auth/react';

import { imageDelete, imageUpload } from '@/utils/imageUpload';
import prisma from '@/utils/prisma';

interface ExtendedRequest extends NextApiRequest {
  file: {
    Location: string;
  };
}

const handler = nextConnect<ExtendedRequest, NextApiResponse>({
  onError(error, _, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

handler.get(async (req, res) => {
  const session: any = await getSession({ req });
  const userId = session.user.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized', ok: false });
  }

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

      return res.status(200).json({ result: searchedPosts, message: 'Get Successful!', ok: true });
    } catch (error) {
      return res.status(500).json({ message: 'Prisma Error', ok: false });
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

handler.post(imageUpload('original').single('image'), async (req, res) => {
  const session: any = await getSession({ req });
  const userId = session.user.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized', ok: false });
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
        image: image.Location,
        description: description,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.status(200).json({ message: 'Post Successful!', ok: true });
  } catch (error) {
    res.status(500).json({ message: 'Prisma Error', ok: false });
  }
});

handler.delete(async (req, res) => {
  const session: any = await getSession({ req });
  const userId = session.user.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized', ok: false });
  }

  const { postId } = req.query;

  try {
    const posts = await prisma.post.delete({
      where: {
        id: String(postId),
      },
      select: {
        image: true,
      },
    });

    try {
      imageDelete(posts.image.split('amazonaws.com/')[1]);
    } catch (error) {
      return res.status(500).json({ message: 'Multer Error', ok: false });
    }

    res.status(200).json({ result: posts, message: 'Delete Successful!', ok: true });
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
