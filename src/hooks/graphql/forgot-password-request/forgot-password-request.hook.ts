import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { ForgotPassword, ForgotPasswordVariables } from '../../../interfaces/generated/ForgotPassword';
import { useGraphQlErrorHandler } from '../grahhql-error-handler/grahpql-error-handler.hook';

export const useForgotPasswordRequest = () => {

  const forgotPasswordMutation = loader('./gql/mutationForgotPassword.graphql');

  const [errorMessage, setErrorMessage] = useState('');
  const [_forgotPasswordAsync, { loading, data }] = useMutation<ForgotPassword, ForgotPasswordVariables>(forgotPasswordMutation);

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const forgotPasswordAsync = async (email: string): Promise<void> => {
    try {
      const variables: ForgotPasswordVariables = {
        input: {
          email,
        },
      };
      await _forgotPasswordAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    loading,
    forgotPasswordAsync,
    data,
    errorMessage,
  };
};
