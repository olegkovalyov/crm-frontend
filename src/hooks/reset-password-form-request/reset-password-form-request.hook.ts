import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { IGraphQlError } from '../../interfaces/auth.interface';
import { ResetPassword, ResetPasswordVariables } from '../../interfaces/generated/ResetPassword';
import { setUserAction } from '../../redux/auth/auth.actions';
import { useDispatch } from 'react-redux';

export const useResetPasswordFormRequest = () => {

  const dispatch = useDispatch();
  const resetPasswordMutation = loader('./gql/mutationResetPassword.graphql');

  const [errorMessage, setErrorMessage] = useState('');
  const [_resetPasswordAsync, { loading, data }] = useMutation<ResetPassword, ResetPasswordVariables>(resetPasswordMutation);

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
      e.graphQLErrors.map((x: IGraphQlError) => setErrorMessage(x.message));
    }
  };

  return {
    loading,
    resetPasswordAsync,
    data,
    errorMessage,
  };
};
