import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { useGraphQlErrorHandler } from '../grahhql-error-handler/grahpql-error-handler.hook';
import { DeleteUser, DeleteUserVariables } from '../../interfaces/generated/DeleteUser';

const deleteUserMutation = loader('./gql/mutationDeleteUser.graphql');

export const useDeleteUserRequest = () => {

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_deleteUserAsync, { loading, data }] = useMutation<DeleteUser, DeleteUserVariables>(deleteUserMutation);


  const deleteUserAsync = async (id: string): Promise<void> => {
    try {
      const variables: DeleteUserVariables = {
        input: id,
      };
      setErrorMessage('');
      await _deleteUserAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    deleting: loading,
    deleteUserAsync,
    deletedUserData: data,
    deleteErrorMessage: errorMessage,
  };
};
