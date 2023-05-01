import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import nextConnect from 'next-connect';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, _, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

handler.post(async (req, res) => {
  const session: any = await getSession({ req });
  const userId = session.user.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized', ok: false });
  }

  const { nickname } = req.body;

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: nickname,
      },
    });

    res.status(200).json({ message: 'Nickname Updated!', ok: true });
  } catch (error) {
    res.status(500).json({ message: 'Prisma Error', ok: false });
  }
});

export default handler;
