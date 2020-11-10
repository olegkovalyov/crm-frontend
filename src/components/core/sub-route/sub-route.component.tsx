import React, { Suspense } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RouteInterface } from '../../../interfaces/routes.interface';
import Loading from '../../../elements/loading.component';
import { RootStateInterface } from '../../../redux/root.reducer';
import { doesRefreshTokenExists } from '../../../redux/auth/auth.selector';
import { useIsAuthenticated } from '../../../hooks/core/is-authenticated/is-authenticated.hook';
import { authUrls } from '../../../routes';
import { DASHBOARD_URL, LOGIN_URL } from '../../../constants/route.constants';
import { useRefreshTokenQuery } from '../../../hooks/graphql/queries/refresh-token/refresh-token.query.hook';
import { setRedirectUrlAction } from '../../../redux/auth/auth.actions';

const RouteWithSubRoutes = (route: RouteInterface): JSX.Element => {
  const { refreshAccessToken } = useRefreshTokenQuery();
  refreshAccessToken();

  const refreshTokenExists = useSelector((state: RootStateInterface) => doesRefreshTokenExists(state));
  const { isAuthenticated } = useIsAuthenticated();
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Suspense fallback={<Loading />}>
      <Route
        path={route.path}
        render={(props) => {
          if (route.component) {

            if (isAuthenticated
              && authUrls.includes(route.path)
            ) {
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
          dispatch(setRedirectUrlAction(history.location.pathname));
          return <Redirect to={LOGIN_URL} />;
        }}
      />
    </Suspense>
  );
};

export default RouteWithSubRoutes;
