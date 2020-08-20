import { useLazyQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { GetUsers_getUsers, GetUsers } from '../../interfaces/generated/GetUsers';

const usersQuery = loader('./gql/queryGetUsers.graphql');

export const useGetUsersRequest = () => {

  let users: GetUsers_getUsers[] = [];
  const [getUsersAsync, { loading, data, error }] = useLazyQuery<GetUsers>(usersQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')} `,
        },
      },
      fetchPolicy: 'network-only'
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


  return {
    loading,
    users,
    error,
    getUsersAsync,
  };
};
