import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { GetUsers, GetUsersVariables } from '../../../../interfaces/generated/GetUsers';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/common/auth/auth.selector';
import { UserInterface } from '../../../../interfaces/user.interface';
import { LicenseType, UserRole, UserStatus } from '../../../../interfaces/generated/globalTypes';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import getUsersQuery from './gql/get-users.query.graphql';

export const useGetMembersQuery = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  let users: UserInterface[] = [];
  const [_getMembersAsync, { loading, data, called }] = useLazyQuery<GetUsers, GetUsersVariables>(getUsersQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
    });

  if (data && data.getUsers) {
    users = data.getUsers.map(item => ({ ...item }));
  }

  const getMembersAsync = async (
    status: UserStatus[] | null,
    role: UserRole[] | null,
    licenseType: LicenseType[] | null,
    firstName: string | null,
    lastName: string | null,
  ): Promise<void> => {
    const variables: GetUsersVariables = {
      getUsersInput: {
        status,
        role,
        licenseType,
        firstName,
        lastName,
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
    members: users,
    getMembersErrorMessage: errorMessage,
    handleGetMembers: getMembersAsync,
    wasCalledGetMembers: called,
  };
};
