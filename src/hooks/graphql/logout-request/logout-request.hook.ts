import { useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { logoutAction } from '../../../redux/auth/auth.actions';
import { Logout } from '../../../interfaces/generated/Logout';

const logoutQuery = loader('./gql/queryLogout.graphql');

export const useLogoutRequest = () => {

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
