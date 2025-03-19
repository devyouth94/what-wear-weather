import { type PropsWithChildren } from 'react';
import { type Metadata } from 'next';
import { Toaster } from 'sonner';

import TanstackQueryProvider from '~/src/providers/tanstack-query';

import '~/src/styles/globals.css';

export const metadata: Metadata = {
  title: '왓웨어웨더',
  description: '오늘의 옷을 날씨와 함께 아카이빙 해보세요.',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko">
      <body className="bg-yellow-50">
        <TanstackQueryProvider>
          <Toaster position="bottom-center" richColors closeButton />
          {children}
        </TanstackQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
