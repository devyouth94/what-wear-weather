import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

import prisma from 'lib/utils/prismadb';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,

  adapter: PrismaAdapter(prisma),

  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
    }),
    KakaoProvider({
      clientId: String(process.env.KAKAO_CLIENT_ID),
      clientSecret: String(process.env.KAKAO_CLIENT_SECRET),
      allowDangerousEmailAccountLinking: true,
    }),
    NaverProvider({
      clientId: String(process.env.NAVER_CLIENT_ID),
      clientSecret: String(process.env.NAVER_CLIENT_SECRET),
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    jwt: async ({ token }) => {
      const data = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
        select: {
          name: true,
          image: true,
        },
      });
      token.name = data && data.name;
      token.picture = data && data.image;

      return token;
    },
    session: ({ session, token }: { session: any; token: JWT }) => {
      session.user.userId = token.sub;
      session.user.name = token.name;
      session.user.image = token.picture;

      return session;
    },
  },

  pages: {
    signIn: '/login',
  },
});
