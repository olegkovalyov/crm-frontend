import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { CreateMember, CreateMemberVariables } from '../../../../interfaces/generated/CreateMember';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { LicenseType, MemberRole, MemberStatus } from '../../../../interfaces/generated/globalTypes';

const createMemberMutation = loader('./gql/create-member.mutation.graphql');

export const useCreateMemberMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_createMemberAsync, { loading, data }] = useMutation<CreateMember, CreateMemberVariables>(createMemberMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


  const createMemberAsync = async (
    status: MemberStatus,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    roles: MemberRole[],
    licenseType: LicenseType,
  ): Promise<void> => {
    try {
      const variables: CreateMemberVariables = {
        input: {
          status,
          firstName,
          lastName,
          email,
          password,
          roles,
          licenseType,
        },
      };
      setErrorMessage('');
      await _createMemberAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfCreatingMember: loading,
    createMemberAsync,
    memberData: data,
    createMemberErrorMessage: errorMessage,
  };
};
