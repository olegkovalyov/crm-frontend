import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  ForgotPassword,
  ForgotPasswordVariables,
} from '../../../../interfaces/generated/ForgotPassword';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import forgotPasswordMutation from './gql/forgot-password.mutation.graphql';

export const useForgotPasswordMutation = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [_forgotPasswordAsync, {
    loading,
    data,
  }] = useMutation<ForgotPassword, ForgotPasswordVariables>(forgotPasswordMutation);

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
    inProcessOfForgotPassword: loading,
    handleForgotPassword: forgotPasswordAsync,
    forgotPasswordData: data,
    forgotPasswordErrorMessage: errorMessage,
  };
};
