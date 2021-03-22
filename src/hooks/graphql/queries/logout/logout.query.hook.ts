import { useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Logout } from '../../../../interfaces/generated/Logout';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';

const logoutQuery = gql`
    query Logout {
        logout
    }
`;
export const useLogoutQuery = () => {
  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));

  const [logoutAsync, { data }] = useLazyQuery<Logout, null>(logoutQuery, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
    fetchPolicy: 'network-only',
  });

  return {
    handleLogout: logoutAsync,
    logoutData: data,
  };
};
