import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import {
  ClientStatus,
  ClientType, Gender,
  PaymentStatus,
} from '../../../../interfaces/generated/globalTypes';
import { UpdateClient, UpdateClientVariables } from '../../../../interfaces/generated/UpdateClient';

const updateClientMutation = loader('./gql/update-client.mutation.graphql');

export const useUpdateClientMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_updateClientAsync, { loading, data }] = useMutation<UpdateClient, UpdateClientVariables>(updateClientMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


  const updateClientAsync = async (
    id: string,
    type: ClientType,
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
    paymentStatus: PaymentStatus,
    tmId: string | null,
    cameramanId: string | null,
    date: Date | null,
    notes: string | null,
    certificate: string | null,
  ): Promise<void> => {
    try {
      const variables: UpdateClientVariables = {
        input: {
          id,
          type,
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
          paymentStatus,
          tmId,
          cameramanId,
          date,
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
    updateClientAsync,
    updateClientData: data,
    updateClientErrorMessage: errorMessage,
  };
};
