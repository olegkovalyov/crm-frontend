import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/common/auth/auth.selector';
import {
  DeleteClient,
  DeleteClientVariables,
} from '../../../../interfaces/generated/DeleteClient';
import { ClientInterface } from '../../../../interfaces/client.interface';
import deleteClientMutation from './gql/delete-client.mutation.graphql';

export const useDeleteClientMutation = () => {
  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
        id,
      };
      setErrorMessage(null);
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
    deletedClient: data ? data.deleteClient as ClientInterface : null,
    deleteClientErrorMessage: errorMessage,
  };
};
