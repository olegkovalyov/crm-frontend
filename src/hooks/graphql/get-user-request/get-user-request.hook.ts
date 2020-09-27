import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { GetUser, GetUserVariables } from '../../../interfaces/generated/GetUser';
import { IRootState } from '../../../redux/root.reducer';
import { getAccessToken } from '../../../redux/auth/auth.selector';

const getUserQuery = loader('./gql/queryGetUser.graphql');

export const useGetUserRequest = (id: string) => {

  const accessToken = useSelector((state: IRootState) => getAccessToken(state));

  const [getUser, { loading, data, error }] = useLazyQuery<GetUser, GetUserVariables>(getUserQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      variables: {
        input: id,
      },
    });

  return {
    isUserLoading: loading,
    userError: error,
    userData: data,
    getUser,
  };
};
