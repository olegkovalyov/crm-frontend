import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { GetClients } from '../../../../interfaces/generated/GetClients';
import { ClientInterface } from '../../../../interfaces/client.interface';

const getClientsQuery = loader('./gql/get-clients.query.graphql');

export const useGetClientsQuery = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  let clients: ClientInterface[] = [];
  const [_getClientsAsync, { loading, data }] = useLazyQuery<GetClients, null>(getClientsQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
    });

  if (data && data.getClients) {
    clients = data.getClients.map(item => {
      return { ...item };
    });
  }

  const getClientsAsync = async () => {
    try {
      await _getClientsAsync();
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };


  return {
    areClientsLoading: loading,
    getClientsErrorMessage: errorMessage,
    clients,
    getClientsAsync,
  };
};
