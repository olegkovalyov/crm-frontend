import React, { FC, ReactElement } from 'react';
import {
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/root.reducer';
import { getCurrentUser } from '../../redux/auth/auth.selector';
import { url } from '../../constants/url';


export const PrivateRoute: FC<RouteProps> = ({ children, ...rest }): ReactElement => {
  const isLogged = useSelector((state: IRootState) => getCurrentUser(state));
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: url.login,
              state: { from: location },
            }}
          />
        )}
    />
  );
};

