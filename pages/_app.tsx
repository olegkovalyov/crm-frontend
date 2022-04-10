import React from 'react';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { Router } from 'next/router';
import { AppContextType } from 'next/dist/shared/lib/utils';
import { store } from '../src/redux/store';
import Root from '../src/components/layout/root/root';
import { useSsrStylesCleaner } from '../src/hooks/layout/root/ssr-styles-cleaner/ssr-styles-cleaner.hook';
import {
  getAuthByRefreshToken,
  getRefreshToken,
  hasRefreshToken, protectAdminRoutes, protectAuthRoutes,
  removeRefreshToken,
} from '../src/helpers/server/auth.helper';
import { AuthInterface } from '../src/interfaces/auth.interface';

function MyApp({ Component, pageProps }: AppProps) {
  useSsrStylesCleaner();

  return (
    <Provider store={store}>
      <Root>
        <Component {...pageProps} />
      </Root>
    </Provider>
  );
}


MyApp.getInitialProps = async (context: AppContextType<Router>) => {
  const { req: request, res: response } = context.ctx;
  const { router } = context;
  let initialAuth: AuthInterface | null = null;

  if (hasRefreshToken(request)) {
    const refreshToken = getRefreshToken(request);
    initialAuth = (refreshToken !== null) ? await getAuthByRefreshToken(refreshToken) : null;
    initialAuth ? protectAuthRoutes(router.pathname, response) : removeRefreshToken(request, response);
  }

  if (!initialAuth) {
    protectAdminRoutes(router.pathname, response);
  }

  console.log('Initial auth: ', initialAuth);

  return {
    pageProps: {
      initialAuth,
    },
  };
};

export default MyApp;

