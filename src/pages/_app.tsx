import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { DefaultSeo } from 'next-seo';

import GlobalStyles from '@/styles/global';
import SEO from '@/../next-seo.config';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <DefaultSeo {...SEO} />

        <link rel="shortcut icon" href="/img/ico-512.png" />
        <link rel="apple-touch-icon" href="/img/ico-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06092B" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
          integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
          crossOrigin=""
        />
      </Head>
      <GlobalStyles />
      <NextNProgress
        color="#f231a5"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <Component {...pageProps} />
    </>
  );
}
