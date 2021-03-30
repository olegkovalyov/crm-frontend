import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import gql from 'graphql-tag';
import { GetMembers, GetMembersVariables } from '../../../../interfaces/generated/GetMembers';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { MemberInterface } from '../../../../interfaces/member.interface';
import { MemberRole, MemberStatus } from '../../../../interfaces/generated/globalTypes';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';

export const getMembersQuery = gql`
    query GetMembers($getMembersFilter: GetMembersFilterInput!)
    {
        getMembers(getMembersFilterInput: $getMembersFilter){
            id,
            userId,
            status,
            firstName,
            lastName,
            email,
            roles,
            licenseType,
            createdAt,
            updatedAt
        }
    }
`;


export const useGetMembersQuery = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  let members: MemberInterface[] = [];
  const [_getMembersAsync, { loading, data, called }] = useLazyQuery<GetMembers, GetMembersVariables>(getMembersQuery,
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
    handleGetMembers: getMembersAsync,
    wasCalledGetMembers: called,
  };
};
