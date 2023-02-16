import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prismadb from '@/lib/utils/prismadb';

export default NextAuth({
  providers: [],
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: 'jwt',
  },
  jwt: {},
});
