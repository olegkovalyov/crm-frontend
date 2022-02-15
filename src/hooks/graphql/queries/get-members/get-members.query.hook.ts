import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import gql from 'graphql-tag';
import { GetMembers, GetMembersVariables } from '../../../../interfaces/generated/GetMembers';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { UserInterface } from '../../../../interfaces/member.interface';
import { UserRole, UserStatus } from '../../../../interfaces/generated/globalTypes';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';

export const getMembersQuery = gql`
    query GetUsers($getUsersInput: GetUsersInput!)
    {
        getUsers(getUsersInput: $getUsersInput){
            id,
            personId,
            status,
            firstName,
            lastName,
            email,
            role,
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

  let members: UserInterface[] = [];
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
    members = data.getMembers.map(item => ({ ...item }));
  }

  const getMembersAsync = async (
    statuses: UserStatus[] | null,
    roles: UserRole[] | null,
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
