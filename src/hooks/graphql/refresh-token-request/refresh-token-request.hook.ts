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
  const { timeFromLastUpdate } = useIsAuthenticated();
  const refreshTokenExists = useSelector((state: IRootState) => doesRefreshTokenExists(state));

  const refreshAccessToken = () => {
    if (refreshTokenExists
      && (timeFromLastUpdate > 20
        || timeFromLastUpdate === 0)
    ) {
      console.log('Refreshing token');
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
