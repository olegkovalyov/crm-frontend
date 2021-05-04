import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import gql from 'graphql-tag';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import {
  ClientStatus,
  ClientRole, Gender,
} from '../../../../interfaces/generated/globalTypes';
import { CreateClient, CreateClientVariables } from '../../../../interfaces/generated/CreateClient';
import { ClientInterface } from '../../../../interfaces/client.interface';

const mutation = gql`
    mutation CreateClient($input: CreateClientInput!) {
        createClient(createClientInput: $input)
        {
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

export const useCreateClientMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [_createClientAsync, { loading, data }] = useMutation<CreateClient, CreateClientVariables>(mutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


  const createClientAsync = async (
    role: ClientRole,
    status: ClientStatus,
    gender: Gender,
    age: number,
    firstName: string,
    lastName: string,
    email: string | null,
    weight: number,
    phone: string,
    address: string,
    withHandCameraVideo: boolean,
    withCameraman: boolean,
    notes: string | null,
    certificate: string | null,
  ): Promise<void> => {
    try {
      const variables: CreateClientVariables = {
        input: {
          role,
          status,
          gender,
          age,
          firstName,
          lastName,
          email,
          weight,
          phone,
          address,
          withHandCameraVideo,
          withCameraman,
          notes,
          certificate,
        },
      };
      setErrorMessage(null);
      await _createClientAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfCreatingClient: loading,
    handleCreateClient: createClientAsync,
    createdClient: data ? (data.createClient as ClientInterface) : null,
    createClientErrorMessage: errorMessage,
  };
};
