import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Login, LoginVariables } from '../../../../interfaces/generated/Login';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';

const mutation = gql`
    mutation Login($input: LoginInput!) {
        login(loginInput: $input) {
            payload {
                id,
                userId,
                status,
                firstName,
                lastName,
                email,
                roles,
                licenseType,
                createdAt,
                updatedAt,
            },
            accessToken,
        }
    }
`;

export const useLoginMutation = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [runLoginMutation, { loading, data }] = useMutation<Login, LoginVariables>(mutation);

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
  };
};
