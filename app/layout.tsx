import { type PropsWithChildren } from 'react';
import { type Metadata } from 'next';

import '~/src/styles/globals.css';

export const metadata: Metadata = {
  title: '왓웨어웨더',
  description: '오늘의 옷을 날씨와 함께 아카이빙 해보세요.',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko">
      <body className="bg-yellow-50">
        <main className="absolute left-1/2 top-0 min-h-dvh w-full max-w-md -translate-x-1/2 bg-green-200">
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
