import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { GetUser, GetUserVariables } from '../../../../interfaces/generated/GetUser';
import { IRootState } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';

const getUserQuery = loader('./gql/get-user.query.graphql');

export const useGetUserQuery = () => {

  const accessToken = useSelector((state: IRootState) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  const [_getUserAsync, { loading, data }] = useLazyQuery<GetUser, GetUserVariables>(getUserQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
    });


  const getUserAsync = async (userId: string) => {
    const variables: GetUserVariables = {
      userId,
    };
    try {
      await _getUserAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    isUserLoading: loading,
    getUserErrorMessage: errorMessage,
    userData: data,
    getUserAsync,
  };
};
