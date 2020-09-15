import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { useGraphQlErrorHandler } from '../grahhql-error-handler/grahpql-error-handler.hook';
import { UpdateUser, UpdateUserVariables } from '../../interfaces/generated/UpdateUser';

const updateUserMutation = loader('./gql/mutationUpdateUser.graphql');

export const useUpdateUserRequest = () => {

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_updateUserAsync, { loading, data }] = useMutation<UpdateUser, UpdateUserVariables>(updateUserMutation);


  const updateUserAsync = async (
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string | null,
    role: string,
    licenseType: string,
  ): Promise<void> => {
    console.log(email);
    try {
      const variables: UpdateUserVariables = {
        input: {
          id,
          firstName,
          lastName,
          email,
          password,
          role,
          licenseType,
        },
      };
      setErrorMessage('');
      await _updateUserAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    loading,
    updateUserAsync,
    updatedUserData: data,
    updateErrorMessage: errorMessage,
  };
};
