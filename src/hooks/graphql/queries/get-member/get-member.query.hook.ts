import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { GetMember, GetMemberVariables } from '../../../../interfaces/generated/GetMember';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { MemberInterface } from '../../../../interfaces/member.interface';

const getMemberQuery = loader('./gql/get-member.query.graphql');

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

  const getMemberAsync = async (memberId: string) => {
    const variables: GetMemberVariables = {
      memberId,
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
    getMemberAsync,
  };
};
