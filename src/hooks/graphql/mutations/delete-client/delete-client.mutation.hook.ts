import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import gql from 'graphql-tag';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { DeleteClient, DeleteClientVariables } from '../../../../interfaces/generated/DeleteClient';
import { ClientInterface } from '../../../../interfaces/client.interface';

export const deleteClientMutation = gql`
    mutation DeleteClient($input: Int!) {
        deleteClient(id: $input) {
            id,
            userId,
            address,
            age,
            certificate,
            createdAt,
            email,
            firstName,
            gender,
            lastName,
            notes,
            phone,
            processedAt,
            role,
            status,
            updatedAt,
            weight,
            withCameraman,
            withHandCameraVideo,
        }
    }
`;
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
        input: id,
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
