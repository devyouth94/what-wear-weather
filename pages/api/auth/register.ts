import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

import { hashPassword } from '@/lib/utils/auth';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, nickname, password } = req.body;
  const hashedPassword = await hashPassword(password);

  try {
    await prisma.user.create({
      data: {
        userId,
        nickname,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'Created user', ok: true });
  } catch (error) {
    res.status(202).json({ message: 'Error!', ok: false });
  }
}
