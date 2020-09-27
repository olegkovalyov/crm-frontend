import React, { FC, ReactElement } from 'react';
import {
  Route,
  RouteProps,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../loading/loading.component';
import { url } from '../../constants/url';
import { useIsAuthenticated } from '../../hooks/core/is-authenticated/is-authenticated.hook';
import { doesRefreshTokenExists } from '../../redux/auth/auth.selector';
import { IRootState } from '../../redux/root.reducer';


export const PrivateRoute: FC<RouteProps> = ({ children, ...rest }): ReactElement => {

  const refreshTokenExists = useSelector((state: IRootState) => doesRefreshTokenExists(state));
  const { isAuthenticated } = useIsAuthenticated();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (isAuthenticated) {
          return children;
        }
        if (refreshTokenExists
          && !isAuthenticated) {
          return <Loading />;
        }
        return <Redirect to={url.login} />;
      }}
    />
  );
};

