import { useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { logoutAction } from '../../../../redux/auth/auth.actions';
import { Logout } from '../../../../interfaces/generated/Logout';

const logoutQuery = gql`
    query Logout {
        logout
    }

`;
export const useLogoutQuery = () => {

  const dispatch = useDispatch();

  const [logoutAsync] = useLazyQuery<Logout, null>(logoutQuery, {
    onCompleted: (logoutData) => {
      dispatch(logoutAction());
    },
    onError: (e) => {
      dispatch(logoutAction());
    },
  });


  return {
    logoutAsync,
  };
};
