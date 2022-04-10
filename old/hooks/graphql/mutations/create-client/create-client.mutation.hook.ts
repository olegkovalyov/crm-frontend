import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/common/auth/auth.selector';
import {
  ClientStatus,
  ClientRole,
  Gender,
  PaymentStatus,
} from '../../../../interfaces/generated/globalTypes';
import {
  CreateClient,
  CreateClientVariables,
} from '../../../../interfaces/generated/CreateClient';
import { ClientInterface } from '../../../../interfaces/client.interface';
import createClientMutation from './gql/create-client.mutation.graphql';

export const useCreateClientMutation = () => {
  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [_createClientAsync, {
    loading,
    data,
  }] = useMutation<CreateClient, CreateClientVariables>(createClientMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });

  const createClientAsync = async (
    role: ClientRole | null,
    status: ClientStatus | null,
    paymentStatus: PaymentStatus | null,
    gender: Gender | null,
    dateOfBirth: Date | null,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    weight: number | null,
    phone: string | null,
    additionalInfo: string | null,
    certificate: string | null,
  ): Promise<void> => {
    try {
      const variables: CreateClientVariables = {
        client: {
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
