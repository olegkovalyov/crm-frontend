import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { GetLoads, GetLoadsVariables } from '../../../../interfaces/generated/GetLoads';
import { LoadInterface } from '../../../../interfaces/load.interface';
import { ClientStatus, UserRole, UserStatus } from '../../../../interfaces/generated/globalTypes';
import getLoadsQuery from './gql/get-loads.query.graphql';

export const useGetLoadsQuery = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  let loads: LoadInterface[] | null = null;
  const [_getLoadsAsync, { loading, data, called, error }] = useLazyQuery<GetLoads, GetLoadsVariables>(getLoadsQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
      onError: (e) => {
        const formattedErrorMessage = getFormattedErrorMessage(e);
        setErrorMessage(formattedErrorMessage);
      },
    });

  if (data && data.getLoads) {
    loads = data.getLoads.map(item => ({ ...item }));
  }

  // if (data && data.getClients) {
  //   clients = data.getClients.map(item => ({ ...item }));
  // }
  //
  // if (data && data.getMembers) {
  //   members = data.getMembers.map(item => ({ ...item }));
  // }

  const getLoadsAsync = async (
    eventId: number,
    memberStatuses: UserStatus[] | null,
    memberRoles: UserRole[] | null,
    clientStatusOptions: ClientStatus[] | null,
    isClientAssigned: boolean | null,
    clientCreatedAtMin: Date | null,
    clientCreatedAtMax: Date | null,
  ) => {
    setErrorMessage(null);
    const variables: GetLoadsVariables = {
      eventId,
    };
    await _getLoadsAsync({ variables });
  };


  return {
    inProcessOfFetchingLoads: loading,
    getLoadsErrorMessage: errorMessage,
    wasCalledGetLoads: called,
    getLoadsAsync,
    loads,
  };
};
