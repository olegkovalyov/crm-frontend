import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { useDispatch } from 'react-redux';
import { ResetPassword, ResetPasswordVariables } from '../../interfaces/generated/ResetPassword';
import { setUserAction } from '../../redux/auth/auth.actions';
import { useGraphQlErrorHandler } from '../grahhql-error-handler/grahpql-error-handler.hook';

export const useResetPasswordFormRequest = () => {

  const dispatch = useDispatch();
  const resetPasswordMutation = loader('./gql/mutationResetPassword.graphql');

  const [errorMessage, setErrorMessage] = useState('');
  const [_resetPasswordAsync, { loading, data }] = useMutation<ResetPassword, ResetPasswordVariables>(resetPasswordMutation);

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  useEffect(() => {
    if (data) {
      dispatch(setUserAction(data.resetPassword));
    }
  }, [data, dispatch]);

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
    loading,
    resetPasswordAsync,
    data,
    errorMessage,
  };
};
