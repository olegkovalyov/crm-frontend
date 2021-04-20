import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import gql from 'graphql-tag';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { DeleteClient, DeleteClientVariables } from '../../../../interfaces/generated/DeleteClient';

export const deleteClientMutation = gql`
    mutation DeleteClient($input: Int!) {
        deleteClient(id: $input)
    }
`;
export const useDeleteClientMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_deleteClientAsync, {
    loading,
    data,
  }] = useMutation<DeleteClient, DeleteClientVariables>(deleteClientMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


  const deleteClientAsync = async (id: number): Promise<void> => {
    try {
      const variables: DeleteClientVariables = {
        input: id,
      };
      setErrorMessage('');
      await _deleteClientAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfDeletingClient: loading,
    handleDeleteClient: deleteClientAsync,
    deletedClientData: data,
    deleteClientErrorMessage: errorMessage,
  };
};
