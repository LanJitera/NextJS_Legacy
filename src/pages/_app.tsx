import "@styles/app.css";
import "@jitera/jitera-web-ui-library/dist/style.css";
import "@jitera/jitera-web-ui-library/dist/index.css";
import { useMemo, FunctionComponent } from "react";
import { ThemeProvider } from "@jitera/jitera-web-ui-library";
import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { NextSeo } from "next-seo";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { appWithTranslation, SSRConfig } from "next-i18next";
import memoryStorage from "@utils/memoryStorage";
import AppProvider from "@components/layout/AppProvider";

type PageProps = {
  dehydratedState: unknown;
  session: Session;
  seo: { title: string; description: string };
} & SSRConfig;
const MyApp: FunctionComponent<AppProps<PageProps>> = ({
  Component,
  pageProps,
}) => {
  const queryClient = useMemo(() => new QueryClient(), []);
  memoryStorage.setAuthenticationInfo(pageProps.session);
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider>
            <SessionProvider session={pageProps.session}>
              <NextSeo
                title={pageProps?.seo?.title}
                description={pageProps?.seo?.description}
              />

              <AppProvider>
                <Component {...pageProps} />
              </AppProvider>
            </SessionProvider>
          </ThemeProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default appWithTranslation(MyApp);
