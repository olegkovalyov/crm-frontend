import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import gql from 'graphql-tag';
import { GetMember, GetMemberVariables } from '../../../../interfaces/generated/GetMember';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { MemberInterface } from '../../../../interfaces/member.interface';

export const getMemberQuery = gql`
    query GetMember($id: Int!) {
        getMember(id: $id) {
            id,
            userId,
            status,
            firstName,
            lastName,
            email,
            roles,
            licenseType,
            createdAt,
            updatedAt
        }
    }
`;

export const useGetMemberQuery = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  const [_getMemberAsync, { loading, data, called }] = useLazyQuery<GetMember, GetMemberVariables>(getMemberQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
    });

  let member: MemberInterface | null = null;

  const getMemberAsync = async (id: number) => {
    const variables: GetMemberVariables = {
      id,
    };
    try {
      await _getMemberAsync({
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
