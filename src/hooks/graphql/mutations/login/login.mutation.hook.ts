import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import {
  Login,
  LoginVariables,
} from '../../../../interfaces/generated/Login';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';

const loginMutation = loader('./gql/login.mutation.graphql');

export const useLoginMutation = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [runLoginMutation, { loading, data }] = useMutation<Login, LoginVariables>(loginMutation);

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const loginAsync = async (email: string, password: string): Promise<void> => {
    try {
      const variables: LoginVariables = {
        input: {
          email,
          password,
        },
      };
      await runLoginMutation({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfLogin: loading,
    handleLogin: loginAsync,
    loginData: data,
    loginErrorMessage: errorMessage,
    setLoginErrorMessage: setErrorMessage,
  };
};
