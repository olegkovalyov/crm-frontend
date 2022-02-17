import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { GetClient, GetClientVariables } from '../../../../interfaces/generated/GetClient';
import { ClientInterface } from '../../../../interfaces/client.interface';
import getClientQuery from './gql/get-client.graphql';

export const useGetClientQuery = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  const [_getClientAsync, { loading, data, called }] = useLazyQuery<GetClient, GetClientVariables>(getClientQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
    });

  let client: ClientInterface | null = null;

  if (data && data.getClient) {
    client = data.getClient;
  }

  const getClientAsync = async (id: number) => {
    const variables: GetClientVariables = {
      id,
    };
    try {
      await _getClientAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    isClientLoading: loading,
    getClientErrorMessage: errorMessage,
    setClientErrorMessage: setErrorMessage,
    wasClientLoadCalled: called,
    client,
    getClientAsync,
  };
};
