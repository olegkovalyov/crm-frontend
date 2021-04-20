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
import { UpdateClient, UpdateClientVariables } from '../../../../interfaces/generated/UpdateClient';

const mutation = gql`
    mutation UpdateClient($input: UpdateClientInput!) {
        updateClient(updateClientInput: $input){
            id,
        }
    }
`;
export const useUpdateClientMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_updateClientAsync, { loading, data }] = useMutation<UpdateClient, UpdateClientVariables>(mutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


  const updateClientAsync = async (
    id: number,
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
      const variables: UpdateClientVariables = {
        input: {
          id,
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
      setErrorMessage('');
      await _updateClientAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfUpdatingClient: loading,
    handleClientUpdate:updateClientAsync,
    updateClientData: data,
    updateClientErrorMessage: errorMessage,
  };
};
