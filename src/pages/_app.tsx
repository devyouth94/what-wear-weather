import { useState } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Global, ThemeProvider } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import globalTheme from '@/styles/globalTheme';
import { globalStyles } from '@/styles/globalStyles';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider theme={globalTheme}>
          <Head>
            <title>왓웨어웨더. | 그날의 옷을 저장하세요</title>
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#2C3639" />
            <meta
              name="viewport"
              content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
            />
          </Head>

          <Global styles={globalStyles} />

          <Component {...pageProps} />

          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            theme="colored"
            closeButton={false}
          />
        </ThemeProvider>
      </SessionProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
