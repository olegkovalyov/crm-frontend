import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { CreateUser, CreateUserVariables } from '../../interfaces/generated/CreateUser';
import { useGraphQlErrorHandler } from '../grahhql-error-handler/grahpql-error-handler.hook';

const createUserMutation = loader('./gql/mutationCreateUser.graphql');

export const useCreateUserRequest = () => {

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_createUserAsync, { loading, data }] = useMutation<CreateUser, CreateUserVariables>(createUserMutation);


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
