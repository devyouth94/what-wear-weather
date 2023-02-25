import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import { imageUpload } from '@/lib/utils/imageUpload';

interface ExtendedRequest extends NextApiRequest {
  file: {
    Location: string;
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

handler.post(imageUpload('profile').single('image'), async (req, res) => {
  const session: any = await getSession({ req });
  const userId = session.user.userId;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized', ok: false });
  }

  const image = req.file;

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: image.Location,
      },
    });

    res.status(200).json({ message: 'Profile Change Successful!', ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Prisma Error', ok: false });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
