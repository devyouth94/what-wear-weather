import { type PropsWithChildren } from 'react';
import { type Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';

import TanstackQueryProvider from '~/src/providers/tanstack-query';
import { cn } from '~/src/utils/class-name';

import '~/src/styles/globals.css';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '왓웨어웨더',
  description: '오늘의 옷을 날씨와 함께 아카이빙 해보세요.',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko">
      <body className={cn(pretendard.variable, 'font-pretendard')}>
        <TanstackQueryProvider>
          <Toaster position="bottom-center" richColors closeButton />
          {children}
        </TanstackQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
