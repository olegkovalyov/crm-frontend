import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { Login, LoginVariables } from '../../../interfaces/generated/Login';
import { useGraphQlErrorHandler } from '../grahhql-error-handler/grahpql-error-handler.hook';
import { setUserAction } from '../../../redux/auth/auth.actions';

export const useLoginRequest = () => {

  const dispatch = useDispatch();
  const loginMutation = loader('./gql/mutationLogin.graphql');

  const [errorMessage, setErrorMessage] = useState('');
  const [_loginAsync, { loading, data }] = useMutation<Login, LoginVariables>(loginMutation);

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  useEffect(() => {
    if (data) {
      dispatch(setUserAction(data.login));
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
