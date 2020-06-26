import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { IGraphQlError } from '../../interfaces/auth.interface';
import { ForgotPassword, ForgotPasswordVariables } from '../../interfaces/generated/ForgotPassword';

export const useForgotPasswordFormRequest = () => {

  const forgotPasswordMutation = loader('./gql/mutationForgotPassword.graphql');

  const [errorMessage, setErrorMessage] = useState('');
  const [_forgotPasswordAsync, { loading, data }] = useMutation<ForgotPassword, ForgotPasswordVariables>(forgotPasswordMutation);


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
      e.graphQLErrors.map((x: IGraphQlError) => setErrorMessage(x.message));
    }
  };

  return {
    loading,
    forgotPasswordAsync,
    data,
    errorMessage,
  };
};
