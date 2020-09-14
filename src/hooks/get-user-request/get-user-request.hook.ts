import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { GetUser, GetUserVariables } from '../../interfaces/generated/GetUser';

const getUserQuery = loader('./gql/queryGetUser.graphql');

export const useGetUserRequest = (id: string) => {
  const { loading, data, error } = useQuery<GetUser, GetUserVariables>(getUserQuery,
    {
      variables: {
        input: id,
      },
    });

  return {
    isUserLoading: loading,
    userError: error,
    getUserData: data,
  };
};
