import React, { ReactElement } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { makeStyles } from '@material-ui/core/styles';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { ApolloProvider } from '@apollo/react-hooks';
import { store, persistor } from './redux/store';
import Dashboard from './pages/dashboard/dashboard.component';
import Users from './pages/users/users.component';
import Settings from './pages/settings/settings.component';
import { PrivateRoute } from './components/private-route/private-route.component';
import NotFound from './pages/not-found/not-found.component';
import LogIn from './pages/login/login.component';
import Register from './pages/register/register.component';
import { url } from './constants/url';
import { client } from './http/graphql.client';
import ForgotPassword from './pages/forgot-password/forgot-password.component';
import ResetPassword from './pages/reset-password/reset-password.component';
import EditUser from './pages/edit-user/edit-user.component';
import CreateUser from './pages/create-user/create-user.component';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

const App: React.FC = (props): ReactElement => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ApolloProvider client={client}>
          <div className={classes.root}>
            <SwitchTransition>
              <CSSTransition
                key={location.pathname}
                timeout={300}
                classNames="page"
              >
                <Switch location={location}>
                  <PrivateRoute exact path={url.dashboard}>
                    <Dashboard />
                  </PrivateRoute>
                  <PrivateRoute exact path={url.users}>
                    <Users />
                  </PrivateRoute>
                  <PrivateRoute exact path={`${url.createUser}`}>
                    <CreateUser />
                  </PrivateRoute>
                  <PrivateRoute exact path={`${url.editUser}/:id`}>
                    <EditUser />
                  </PrivateRoute>
                  <PrivateRoute exact path={url.settings}>
                    <Settings />
                  </PrivateRoute>
                  <Route exact path={url.login}>
                    <LogIn />
                  </Route>
                  <Route exact path={url.register}>
                    <Register />
                  </Route>
                  <Route exact path={url.forgotPassword}>
                    <ForgotPassword />
                  </Route>
                  <Route exact path={url.resetPassword}>
                    <ResetPassword />
                  </Route>
                  <Route>
                    <NotFound />
                  </Route>
                </Switch>
              </CSSTransition>
            </SwitchTransition>
          </div>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
