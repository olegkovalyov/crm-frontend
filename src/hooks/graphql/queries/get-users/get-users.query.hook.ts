import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { GetUsers, GetUsersVariables } from '../../../../interfaces/generated/GetUsers';
import { IRootState } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { UserInterface } from '../../../../interfaces/user.interface';
import { UserRole, UserStatus } from '../../../../interfaces/generated/globalTypes';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';

const getUsersQuery = loader('./gql/get-users.query.graphql');

export const useGetUsersQuery = () => {

  const accessToken = useSelector((state: IRootState) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  let users: UserInterface[] = [];
  const [_getUsersAsync, { loading, data }] = useLazyQuery<GetUsers, GetUsersVariables>(getUsersQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
    });

  if (data && data.getUsers) {
    users = data.getUsers.filter(x => x != null) as UserInterface[];
    users = users.map(x => {
      const user = { ...x };
      const createdAt = new Date(parseInt(x.createdAt));
      const updatedAt = new Date(parseInt(x.updatedAt));
      user.createdAt = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`;
      user.updatedAt = `${updatedAt.toLocaleDateString()} ${updatedAt.toLocaleTimeString()}`;
      return user;
    });
  }

  const getUsersAsync = async (
    statuses: UserStatus[] | null,
    roles: UserRole[] | null,
  ): Promise<void> => {
    const variables: GetUsersVariables = {
      getUsersFilter: {
        statuses,
        roles,
      },
    };
    try {
      await _getUsersAsync({ variables });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };


  return {
    areUsersLoading: loading,
    usersData: users,
    getUsersErrorMessage: errorMessage,
    getUsersAsync,
  };
};
