import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { loader } from 'graphql.macro';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import {
  ClientStatus,
  ClientRole,
  Gender,
  PaymentStatus,
} from '../../../../interfaces/generated/globalTypes';
import {
  UpdateClient,
  UpdateClientVariables,
} from '../../../../interfaces/generated/UpdateClient';
import { ClientInterface } from '../../../../interfaces/client.interface';

const updateClientMutation = loader('./gql/update-client.mutation.graphql');

export const useUpdateClientMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [_updateClientAsync, {
    loading,
    data,
  }] = useMutation<UpdateClient, UpdateClientVariables>(updateClientMutation, {
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
    paymentStatus: PaymentStatus,
    gender: Gender,
    dateOfBirth: Date,
    firstName: string,
    lastName: string,
    email: string | null,
    weight: number,
    phone: string,
    additionalInfo: string | null,
    certificate: string | null,
    processedAt: Date | null,
  ): Promise<void> => {
    try {
      const variables: UpdateClientVariables = {
        client: {
          id,
          role,
          status,
          paymentStatus,
          gender,
          dateOfBirth,
          firstName,
          lastName,
          email,
          weight,
          phone,
          additionalInfo,
          certificate,
          processedAt,
        },
      };
      setErrorMessage(null);
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
    handleClientUpdate: updateClientAsync,
    updatedClient: data ? (data.updateClient as ClientInterface) : null,
    updateClientErrorMessage: errorMessage,
  };
};
