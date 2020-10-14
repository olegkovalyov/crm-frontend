import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { GetUsers_getUsers, GetUsers, GetUsersVariables } from '../../../interfaces/generated/GetUsers';
import { IRootState } from '../../../redux/root.reducer';
import { getAccessToken } from '../../../redux/auth/auth.selector';
import { RolesType, UserStatusType } from '../../../constants/user.constants';

const usersQuery = loader('./gql/queryGetUsers.graphql');

export const useGetUsersRequest = () => {

  const accessToken = useSelector((state: IRootState) => getAccessToken(state));

  let users: GetUsers_getUsers[] = [];
  const [_getUsersAsync, { loading, data, error }] = useLazyQuery<GetUsers, GetUsersVariables>(usersQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
    });

  if (data && data.getUsers) {
    users = data.getUsers.filter(x => x != null) as GetUsers_getUsers[];
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
    statuses: UserStatusType[] | null,
    roles: RolesType[] | null,
  ): Promise<void> => {
    const variables: GetUsersVariables = {
      getUsersFilter: {
        statuses,
        roles,
      },
    };
    await _getUsersAsync({ variables });
  };


  return {
    loading,
    users,
    error,
    getUsersAsync,
  };
};
