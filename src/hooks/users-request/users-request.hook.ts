import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { IGraphQlError } from '../../interfaces/auth.interface';
import { GetUsers_getUsers, GetUsers } from '../../interfaces/generated/GetUsers';
import { setUsers } from '../../redux/users/users.actions';

const usersQuery = loader('./gql/queryGetUsers.graphql');

export const useGetUsersRequest = () => {

  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState('');
  const [_getUsersAsync, { loading, data }] = useLazyQuery<GetUsers>(usersQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')} `,
        },
      },
    });

  useEffect(() => {
    if (data && data.getUsers) {
      const users = data.getUsers.filter(x => x != null) as GetUsers_getUsers[];
      dispatch(setUsers(users));
    }
  }, [data, dispatch]);


  const getUsersAsync = async (): Promise<void> => {
    try {
      await _getUsersAsync();
    } catch (e) {
      e.graphQLErrors.map((x: IGraphQlError) => setErrorMessage(x.message));
    }
  };

  return {
    loading,
    errorMessage,
    getUsersAsync,
  };
};
