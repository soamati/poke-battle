import "@fontsource/kanit/300.css";
import theme from "src/styles/theme";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider } from "@chakra-ui/react";
import ToggleColorMode from "src/components/ToggleColorMode";
import Head from "next/head";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>PokéBattle</title>
      </Head>

      <QueryClientProvider client={client}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />

          <ToggleColorMode />
        </ChakraProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
