import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import gql from 'graphql-tag';
import { GetMember, GetMemberVariables } from '../../../../interfaces/generated/GetMember';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { UserInterface } from '../../../../interfaces/member.interface';

export const getUserQuery = gql`
    query GetUser($id: Int!) {
        getUser(id: $id) {
            id,
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

export const useGetUserQuery = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  const [_getUserAsync, { loading, data, called }] = useLazyQuery<GetMember, GetMemberVariables>(getUserQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
    });

  let member: UserInterface | null = null;

  const getMemberAsync = async (id: number) => {
    const variables: GetMemberVariables = {
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

  if (data && data.getMember) {
    member = data.getMember;
  }

  return {
    isMemberLoading: loading,
    getMemberErrorMessage: errorMessage,
    setMemberErrorMessage: setErrorMessage,
    wasMemberLoadCalled: called,
    member,
    handleGetMember: getMemberAsync,
  };
};
