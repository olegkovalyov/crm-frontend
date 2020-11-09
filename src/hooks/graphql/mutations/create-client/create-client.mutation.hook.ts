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
import { CreateClient, CreateClientVariables } from '../../../../interfaces/generated/CreateClient';

const createClientMutation = loader('./gql/create-client.mutation.graphql');

export const useCreateClientMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_createClientAsync, { loading, data }] = useMutation<CreateClient, CreateClientVariables>(createClientMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


  const createClientAsync = async (
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
    processedAt: Date | null,
    notes: string | null,
    certificate: string | null,
  ): Promise<void> => {
    try {
      const variables: CreateClientVariables = {
        input: {
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
          processedAt,
          notes,
          certificate,
        },
      };
      setErrorMessage('');
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
    createClientAsync,
    clientData: data,
    createClientErrorMessage: errorMessage,
  };
};
