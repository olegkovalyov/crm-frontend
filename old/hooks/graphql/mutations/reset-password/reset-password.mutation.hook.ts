import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  ResetPassword,
  ResetPasswordVariables,
} from '../../../../interfaces/generated/ResetPassword';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import resetPasswordMutation from './gql/reset-password.mutation.graphql';

export const useResetPasswordMutation = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [_resetPasswordAsync, {
    loading,
    data,
  }] = useMutation<ResetPassword, ResetPasswordVariables>(resetPasswordMutation);

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const resetPasswordAsync = async (password: string, token: string): Promise<void> => {
    try {
      const variables: ResetPasswordVariables = {
        input: {
          password,
          token,
        },
      };
      await _resetPasswordAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfResetPassword: loading,
    handleResetPassword: resetPasswordAsync,
    resetPasswordData: data,
    resetPasswordErrorMessage: errorMessage,
  };
};
