import type { AppProps } from 'next/app';
import Head from 'next/head';

import GlobalStyles from '@/styles/global';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My Trips</title>
        <link rel="shortcut icon" href="/img/ico-512.png" />
        <link rel="apple-touch-icon" href="/img/ico-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06092B" />
        <meta
          name="description"
          content="A simple project starter to work with with TypeScript, React, NextJS and Styled Components"
        />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
