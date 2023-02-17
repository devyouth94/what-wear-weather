import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { type, userData } = req.body;

  if (type === 'userId') {
    const existing = await prisma.user.findUnique({
      where: { userId: userData },
    });

    if (existing) {
      return res.status(200).json({ message: 'ID already exists', ok: false });
    } else {
      return res.status(200).json({ message: 'Available', ok: true });
    }
  } else if (type === 'nickname') {
    const existing = await prisma.user.findUnique({
      where: { nickname: userData },
    });

    if (existing) {
      return res.status(200).json({ message: 'Nickname already exists', ok: false });
    } else {
      return res.status(200).json({ message: 'Nickname Available', ok: true });
    }
  }
}
