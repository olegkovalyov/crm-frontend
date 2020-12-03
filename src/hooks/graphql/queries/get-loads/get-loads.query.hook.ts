import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { GetLoads, GetLoadsVariables } from '../../../../interfaces/generated/GetLoads';
import { LoadInterface } from '../../../../interfaces/load.interface';
import { ClientInterface } from '../../../../interfaces/client.interface';
import { MemberInterface } from '../../../../interfaces/member.interface';
import { ClientStatus, MemberRole, MemberStatus, PaymentStatus } from '../../../../interfaces/generated/globalTypes';

const getLoadsQuery = loader('./gql/get-loads.query.graphql');

export const useGetLoadsQuery = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  let loads: LoadInterface[] | null = null;
  let clients: ClientInterface[] | null = null;
  let members: MemberInterface[] | null = null;
  const [_getLoadsAsync, { loading, data, called }] = useLazyQuery<GetLoads, GetLoadsVariables>(getLoadsQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
    });

  if (data && data.getLoads) {
    loads = data.getLoads.map(item => {
      return { ...item };
    });
  }

  if (data && data.getClients) {
    clients = data.getClients.map(item => {
      return { ...item };
    });
  }

  if (data && data.getMembers) {
    members = data.getMembers.map(item => {
      return { ...item };
    });
  }

  const getLoadsAsync = async (
    eventId: number,
    memberStatuses: MemberStatus[] | null,
    memberRoles: MemberRole[] | null,
    clientStatuses: ClientStatus[] | null,
    clientPaymentStatuses: PaymentStatus[] | null,
    isClientAssigned: boolean | null,
    clientCreatedAtMin: Date | null,
    clientCreatedAtMax: Date | null,
  ) => {
    try {
      const variables: GetLoadsVariables = {
        eventId,
        getMembersFilter: {
          statuses: memberStatuses,
          roles: memberRoles,
        },
        getClientsFilter: {
          clientStatuses,
          paymentStatuses: clientPaymentStatuses,
          isAssigned: isClientAssigned,
          createdAtMin: clientCreatedAtMin,
          createdAtMax: clientCreatedAtMax,
        },
      };
      await _getLoadsAsync({ variables });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };


  return {
    areLoadsLoading: loading,
    getLoadsErrorMessage: errorMessage,
    setLoadsErrorMessage: setErrorMessage,
    wasCalledGetLoads: called,
    loads,
    clients,
    members,
    getLoadsAsync,
  };
};
