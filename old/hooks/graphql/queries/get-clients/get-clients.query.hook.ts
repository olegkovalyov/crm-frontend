import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/common/auth/auth.selector';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { GetClients, GetClientsVariables } from '../../../../interfaces/generated/GetClients';
import { ClientInterface } from '../../../../interfaces/client.interface';
import { ClientRole, ClientStatus, Gender, PaymentStatus } from '../../../../interfaces/generated/globalTypes';
import getClientsQuery from './gql/get-clients.graphql';

export const useGetClientsQuery = () => {
  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  let clients: ClientInterface[] = [];
  const [_getClientsAsync, { loading, data }] = useLazyQuery<GetClients, GetClientsVariables>(getClientsQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
    });

  if (data && data.getClients) {
    clients = data.getClients.map(item => ({ ...item }));
  }

  const getClientsAsync = async (
    role: ClientRole[] | null,
    status: ClientStatus[] | null,
    paymentStatus: PaymentStatus[] | null,
    gender: Gender[] | null,
    minDateOfBirth: Date | null,
    maxDateOfBirth: Date | null,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    phone: string | null,
    certificate: string | null,
    minCreatedAt: Date | null,
    maxCreatedAt: Date | null,
    minProcessedAt: Date | null,
    maxProcessedAt: Date | null,
  ) => {
    try {
      const variables: GetClientsVariables = {
        getClientsInput: {
          role,
          status,
          paymentStatus,
          gender,
          minDateOfBirth,
          maxDateOfBirth,
          firstName,
          lastName,
          email,
          phone,
          certificate,
          minCreatedAt,
          maxCreatedAt,
          minProcessedAt,
          maxProcessedAt,
        },
      };
      await _getClientsAsync({ variables });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };


  return {
    areClientsLoading: loading,
    getClientsErrorMessage: errorMessage,
    clients,
    handleGetClients: getClientsAsync,
  };
};
