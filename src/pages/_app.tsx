import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider } from '@chakra-ui/react';

import theme from 'styles/theme';
import tailwindThemeToggle from 'styles/tailwindThemeToggle';
import 'styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import globalTheme from 'styles/globalTheme';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      }),
  );

  useEffect(() => {
    tailwindThemeToggle();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={pageProps.session}>
          <ThemeProvider theme={globalTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </SessionProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
