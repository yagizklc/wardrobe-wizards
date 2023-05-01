import { useEffect } from 'react';
import Layout from '../components/shared/Layout';
import { StoreProvider } from "../context/Store"
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require('preline')
  }, [])

  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}
