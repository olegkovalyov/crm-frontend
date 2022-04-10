import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { GetUser, GetUserVariables } from '../../../../interfaces/generated/GetUser';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/common/auth/auth.selector';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { UserInterface } from '../../../../interfaces/user.interface';
import getUserQuery from './gql/get-user.query.graphql';

export const useGetUserQuery = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  const [_getUserAsync, { loading, data, called }] = useLazyQuery<GetUser, GetUserVariables>(getUserQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
    });

  let user: UserInterface | null = null;

  const getUserAsync = async (id: number) => {
    const variables: GetUserVariables = {
      id,
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

  if (data && data.getUser) {
    user = data.getUser;
  }

  return {
    isMemberLoading: loading,
    getMemberErrorMessage: errorMessage,
    setMemberErrorMessage: setErrorMessage,
    wasMemberLoadCalled: called,
    member: user,
    handleGetMember: getUserAsync,
  };
};
