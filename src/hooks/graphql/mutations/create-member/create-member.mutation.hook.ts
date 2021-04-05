import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import gql from 'graphql-tag';
import { CreateMember, CreateMemberVariables } from '../../../../interfaces/generated/CreateMember';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { LicenseType, MemberRole, MemberStatus } from '../../../../interfaces/generated/globalTypes';

const mutation = gql`
    mutation CreateMember($input: CreateMemberInput!) {
        createMember(createMemberInput: $input)
        {
            id
        }
    }
`;

export const useCreateMemberMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_createMemberAsync, { loading, data }] = useMutation<CreateMember, CreateMemberVariables>(mutation, {
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
    handleCreateMember: createMemberAsync,
    createMemberData: data,
    createMemberErrorMessage: errorMessage,
  };
};
