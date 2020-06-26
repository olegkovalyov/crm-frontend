import React, { FC, ReactElement } from 'react';
import {
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import { url } from '../../constants/url';
import { useIsLogged } from '../../hooks/is-logged/is-logged.hook';


export const PrivateRoute: FC<RouteProps> = ({ children, ...rest }): ReactElement => {
  const { isLogged } = useIsLogged();
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

