import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { makeStyles } from '@material-ui/core/styles';
import { ApolloProvider } from '@apollo/client';
import { store, persistor } from './redux/store';
import { client } from './http/graphql.client';
import { routes } from './routes';
import AppRouter from './components/core/app-router/app-router.component';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

const App: React.FC = (props): ReactElement => {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ApolloProvider client={client}>
          <div className={classes.root}>
            <AppRouter routes={routes} />
          </div>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
