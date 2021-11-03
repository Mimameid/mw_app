import Head from 'next/head';
import { Provider } from 'react-redux';
import store from 'store/store';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from 'createEmotionCache';
import theme from 'theme/theme';

import 'react-perfect-scrollbar/dist/css/styles.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <Provider store={store}>
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
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}
