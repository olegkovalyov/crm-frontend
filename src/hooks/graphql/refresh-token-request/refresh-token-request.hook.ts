import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { RefreshToken } from '../../../interfaces/generated/RefreshToken';
import { logoutAction, setUserAction } from '../../../redux/auth/auth.actions';
import { useIsAuthenticated } from '../../core/is-authenticated/is-authenticated.hook';
import { IRootState } from '../../../redux/root.reducer';
import { doesRefreshTokenExists } from '../../../redux/auth/auth.selector';
import { client } from '../../../http/graphql.client';
import { store } from '../../../redux/store';

const refreshTokenQuery = loader('./gql/queryRefreshToken.graphql');

export const useRefreshTokenRequest = () => {
  const { timeFromLastUpdate, isAuthenticated } = useIsAuthenticated();
  const refreshTokenExists = useSelector((state: IRootState) => doesRefreshTokenExists(state));

  /*
   We refresh access token only if refresh token exists and
   1) User has access token but there past some time from last update and we need to renew access token
   2) User has no access token
 */
  const refreshAccessToken = () => {
    if (refreshTokenExists
      && (timeFromLastUpdate > 20
        || (!isAuthenticated
          && timeFromLastUpdate === 0))
    ) {
      client.query<RefreshToken, null>({
        query: refreshTokenQuery,
        fetchPolicy: 'network-only',
      }).then((data) => {
        store.dispatch(setUserAction(data.data.refreshToken));
      }).catch(error => {
        store.dispatch(logoutAction());
      });
    }
  };

  return {
    refreshAccessToken,
  };
};
