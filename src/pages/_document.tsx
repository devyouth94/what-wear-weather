import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <title>왓웨어웨더. | 그날의 옷을 저장하세요</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2C3639" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
