import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { GetMembers, GetMembersVariables } from '../../../../interfaces/generated/GetMembers';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { MemberInterface } from '../../../../interfaces/member.interface';
import { MemberRole, MemberStatus } from '../../../../interfaces/generated/globalTypes';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';

const getMembersQuery = loader('./gql/get-members.query.graphql');

export const useGetMembersQuery = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  let members: MemberInterface[] = [];
  const [_getMembersAsync, { loading, data }] = useLazyQuery<GetMembers, GetMembersVariables>(getMembersQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
    });

  if (data && data.getMembers) {
    members = data.getMembers.map(item => {
      return { ...item };
    });
  }

  const getMembersAsync = async (
    statuses: MemberStatus[] | null,
    roles: MemberRole[] | null,
  ): Promise<void> => {
    const variables: GetMembersVariables = {
      getMembersFilter: {
        statuses,
        roles,
      },
    };
    try {
      await _getMembersAsync({ variables });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };


  return {
    areMembersLoading: loading,
    members,
    getMembersErrorMessage: errorMessage,
    getMembersAsync,
  };
};
