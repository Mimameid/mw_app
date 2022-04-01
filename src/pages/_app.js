import Head from 'next/head';
import storeWrapper from 'store/store';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from 'createEmotionCache';
import theme from 'theme/theme';
import 'simplebar/dist/simplebar.min.css';

import Error from 'common/components/Error';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Pickhub</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {/* <!-- google maps --> */}
        <script
          async
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&language=de&libraries=places`}
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {pageProps.error ? (
          <Error statusCode={pageProps.error.statusCode} message={pageProps.error.message} />
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default storeWrapper.withRedux(MyApp);
