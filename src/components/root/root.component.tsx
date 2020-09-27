import React, { FC, ReactElement } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { PrivateRoute } from '../private-route/private-route.component';
import { url } from '../../constants/url';
import Dashboard from '../../pages/dashboard/dashboard.component';
import Users from '../../pages/users/users.component';
import CreateUser from '../../pages/create-user/create-user.component';
import EditUser from '../../pages/edit-user/edit-user.component';
import Settings from '../../pages/settings/settings.component';
import Jumps from '../../pages/jumps/jumps.component';
import History from '../../pages/history/history.component';
import LogIn from '../../pages/login/login.component';
import Register from '../../pages/register/register.component';
import ForgotPassword from '../../pages/forgot-password/forgot-password.component';
import ResetPassword from '../../pages/reset-password/reset-password.component';
import NotFound from '../../pages/not-found/not-found.component';
import { useRefreshTokenRequest } from '../../hooks/graphql/refresh-token-request/refresh-token-request.hook';

const Root: FC = (props): ReactElement => {
  const location = useLocation();

  const { refreshAccessToken } = useRefreshTokenRequest();

  refreshAccessToken();

  return (
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
      <PrivateRoute exact path={url.jumps}>
        <Jumps />
      </PrivateRoute>
      <PrivateRoute exact path={url.history}>
        <History />
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
  );
};

export default Root;
