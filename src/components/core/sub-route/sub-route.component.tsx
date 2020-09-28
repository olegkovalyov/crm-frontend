import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRoute } from '../../../interfaces/routes.interface';
import Loading from '../../../elements/loading.component';
import { IRootState } from '../../../redux/root.reducer';
import { doesRefreshTokenExists } from '../../../redux/auth/auth.selector';
import { useIsAuthenticated } from '../../../hooks/core/is-authenticated/is-authenticated.hook';
import { authUrls } from '../../../routes';
import { DASHBOARD_URL, LOGIN_URL } from '../../../constants/route.constants';
import { useRefreshTokenRequest } from '../../../hooks/graphql/refresh-token-request/refresh-token-request.hook';

const RouteWithSubRoutes = (route: IRoute): JSX.Element => {
  const { refreshAccessToken } = useRefreshTokenRequest();
  refreshAccessToken();

  const refreshTokenExists = useSelector((state: IRootState) => doesRefreshTokenExists(state));
  const { isAuthenticated } = useIsAuthenticated();

  return (
    <Suspense fallback={<Loading />}>
      <Route
        path={route.path}
        render={(props) => {

          if (route.component) {

            if (isAuthenticated
              && authUrls.includes(route.path)) {
              return <Redirect to={DASHBOARD_URL} />;
            }

            if (!route.private) {
              return <route.component {...props} />;
            }
            if (route.private
              && isAuthenticated
            ) {
              return <route.component {...props} />;
            }
            if (refreshTokenExists
              && !isAuthenticated) {
              return <Loading />;
            }
          }
          return <Redirect to={LOGIN_URL} />;

        }}
      />
    </Suspense>
  );
};

export default RouteWithSubRoutes;