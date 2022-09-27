import "@/styles/main.css";
import "@fontsource/kanit/300.css";
import theme from "src/styles/theme";
import Head from "next/head";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider } from "@chakra-ui/react";
import BattleProvider from "@/features/battle/BattleProvider";
import { useRouteChanging } from "@/hooks/useRouteChanging";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  useRouteChanging();

  return (
    <>
      <Head>
        <title>PokéBattle</title>
      </Head>

      <QueryClientProvider client={client}>
        <ChakraProvider theme={theme} resetCSS>
          <BattleProvider>
            <Component {...pageProps} />
          </BattleProvider>
        </ChakraProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
