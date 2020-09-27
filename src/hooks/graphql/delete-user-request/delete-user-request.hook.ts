import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../grahhql-error-handler/grahpql-error-handler.hook';
import { DeleteUser, DeleteUserVariables } from '../../../interfaces/generated/DeleteUser';
import { IRootState } from '../../../redux/root.reducer';
import { getAccessToken } from '../../../redux/auth/auth.selector';

const deleteUserMutation = loader('./gql/mutationDeleteUser.graphql');

export const useDeleteUserRequest = () => {

  const accessToken = useSelector((state: IRootState) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_deleteUserAsync, { loading, data }] = useMutation<DeleteUser, DeleteUserVariables>(deleteUserMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


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
