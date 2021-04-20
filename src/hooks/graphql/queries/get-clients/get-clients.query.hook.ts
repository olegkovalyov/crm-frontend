import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import gql from 'graphql-tag';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { GetClients, GetClientsVariables } from '../../../../interfaces/generated/GetClients';
import { ClientInterface } from '../../../../interfaces/client.interface';
import { ClientStatus } from '../../../../interfaces/generated/globalTypes';

export const getClientsQuery = gql`
    query GetClients($getClientsFilter: GetClientsFilterInput!) {
        getClients(getClientsFilterInput: $getClientsFilter){
            id,
            userId,
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
            createdAt,
            updatedAt,
            processedAt
        }
    }
`;

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
    clientStatusOptions: ClientStatus[] | null,
    isAssigned: boolean | null,
    createdAtMin: Date | null,
    createdAtMax: Date | null,
  ) => {
    try {
      const variables: GetClientsVariables = {
        getClientsFilter: {
          clientStatusOptions,
          isAssigned,
          createdAtMin,
          createdAtMax,
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
