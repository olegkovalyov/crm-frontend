import React from 'react';
import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppProps } from 'next/app';
import { initializeApollo } from '../src/http/graphql.client';
import { persistor, store } from '../src/redux/store';
import Header from '../src/components/layout/header/header.component';
import LeftMenu from '../src/components/layout/left-menu/left-menu.component';

function MyApp({ Component, pageProps }: AppProps) {

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
  }));
  const classes = useStyles();

  const client = initializeApollo();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ApolloProvider client={client}>
          <div className={classes.root}>
            <Header />
            <LeftMenu />
            <Component {...pageProps} />
          </div>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
