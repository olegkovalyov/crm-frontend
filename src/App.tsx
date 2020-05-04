import React, { ReactElement } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { makeStyles } from '@material-ui/core/styles';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { store, persistor } from './redux/store';
import Dashboard from './pages/dashboard/dashboard.component';
import Users from './pages/users/users.component';
import Settings from './pages/settings/settings.component';
import { PrivateRoute } from './components/private-route/private-route.component';
import NotFound from './pages/not-found/not-found.component';
import LogIn from './pages/login/login.component';

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
        <div className={classes.root}>
          <SwitchTransition>
            <CSSTransition
              key={location.pathname}
              timeout={300}
              classNames="page"
            >
              <Switch location={location}>
                <PrivateRoute exact path="/">
                  <Dashboard />
                </PrivateRoute>
                <PrivateRoute exact path="/users">
                  <Users />
                </PrivateRoute>
                <PrivateRoute exact path="/settings">
                  <Settings />
                </PrivateRoute>
                <Route exact path="/login">
                  <LogIn />
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
