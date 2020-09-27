import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { CreateUser, CreateUserVariables } from '../../../interfaces/generated/CreateUser';
import { useGraphQlErrorHandler } from '../grahhql-error-handler/grahpql-error-handler.hook';
import { IRootState } from '../../../redux/root.reducer';
import { getAccessToken } from '../../../redux/auth/auth.selector';

const createUserMutation = loader('./gql/mutationCreateUser.graphql');

export const useCreateUserRequest = () => {

  const accessToken = useSelector((state: IRootState) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_createUserAsync, { loading, data }] = useMutation<CreateUser, CreateUserVariables>(createUserMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


  const createUserAsync = async (firstName: string, lastName: string, email: string, password: string, role: string, licenseType: string): Promise<void> => {
    try {
      const variables: CreateUserVariables = {
        input: {
          firstName,
          lastName,
          email,
          password,
          role,
          licenseType,
        },
      };
      setErrorMessage('');
      await _createUserAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    loading,
    createUserAsync,
    createUserData: data,
    errorMessage,
  };
};
