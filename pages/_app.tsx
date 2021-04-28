import React, { useEffect } from 'react';
import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppProps } from 'next/app';
import { Router, useRouter } from 'next/router';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import { GetServerSidePropsContext } from 'next';
import { initializeApollo } from '../src/http/graphql.client';
import { persistor, store } from '../src/redux/store';
import { AuthInterface } from '../src/interfaces/auth.interface';
import AnonymousHeader from '../src/components/layout/anonymous-header/anonymous-header.component';
import AuthorizedHeader from '../src/components/layout/authorized-header/authorized-header.component';
import LeftMenu from '../src/components/layout/left-menu/left-menu.component';
import { handleAccessToken } from '../src/auth/access-token-handler';
import { SIGN_IN_URL } from '../src/constants/route.constants';
import { checkRouteAccess } from '../src/helpers/check-route-access';


function MyApp({ Component, pageProps }: AppProps) {

  const { auth }: { auth: AuthInterface } = pageProps;

  const router = useRouter();

  useEffect(() => {
    if (!checkRouteAccess(auth, router)) {
      router.push(SIGN_IN_URL);
    }
  }, []);


  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);


  const useStyles = makeStyles(theme => {
    const styles = {
      root: null,
      menuButton: null,
      title: null,
    };
    if (auth.user) {
      styles.root = {
        display: 'flex',
      };
    } else {
      styles.root = {
        flexGrow: 1,
      };
      styles.menuButton = {
        marginRight: theme.spacing(2),
      };
      styles.title = {
        flexGrow: 1,
      };
    }
    return styles;
  });
  const classes = useStyles();

  const client = initializeApollo();

  if (!checkRouteAccess(auth, router)) {
    return (<></>);
  }

  const headerJsx = auth.user ? <AuthorizedHeader user={auth.user} /> : <AnonymousHeader />;
  const leftMenuJsx = auth.user ? <LeftMenu /> : '';

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ApolloProvider client={client}>
          <div className={classes.root}>
            {headerJsx}
            {leftMenuJsx}
            <Component {...pageProps} />
          </div>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}


MyApp.getInitialProps = async (context: AppContextType<Router>) => {
  const auth = await handleAccessToken(context.ctx);
  (context.ctx as unknown as GetServerSidePropsContext).req.cookies.accessToken = auth.accessToken;
  // Pass data to the page via props
  return {
    pageProps: {
      auth,
      url: context.ctx.req.url,
    },
  };
};

export default MyApp;

