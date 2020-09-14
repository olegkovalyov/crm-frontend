import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { Login, LoginVariables } from '../../interfaces/generated/Login';
import { setUserAction } from '../../redux/auth/auth.actions';
import { useGraphQlErrorHandler } from '../grahhql-error-handler/grahpql-error-handler.hook';

export const useLoginFormRequest = () => {

  const dispatch = useDispatch();
  const loginMutation = loader('./gql/mutationLogin.graphql');

  const [errorMessage, setErrorMessage] = useState('');
  const [_loginAsync, { loading, data }] = useMutation<Login, LoginVariables>(loginMutation);

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  useEffect(() => {
    if (data) {
      dispatch(setUserAction(data.login));
      localStorage.setItem('token', data.login.token);
    }
  }, [data, dispatch]);

  const loginAsync = async (email: string, password: string): Promise<void> => {
    try {
      const variables: LoginVariables = {
        input: {
          email,
          password,
        },
      };
      await _loginAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    loading,
    loginAsync,
    data,
    errorMessage,
  };
};
