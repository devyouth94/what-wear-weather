import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getSession } from 'next-auth/react';

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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tommorow = new Date();
  tommorow.setDate(tommorow.getDate() + 1);
  tommorow.setHours(0, 0, 0, 0);

  try {
    const posts = await prisma.post.findFirst({
      where: {
        userId,
        createdAt: {
          gte: today,
          lt: tommorow,
        },
      },
    });

    if (posts) {
      return res.status(200).json({ result: posts, message: 'Already Posted Today', ok: false });
    } else {
      return res.status(200).json({ message: 'Can Post Today', ok: true });
    }
  } catch (error) {
    res.status(500).json({ message: 'Prisma Error', ok: false });
  }
});

export default handler;
