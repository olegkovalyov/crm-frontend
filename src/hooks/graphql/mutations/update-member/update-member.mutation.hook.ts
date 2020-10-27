import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { UpdateMember, UpdateMemberVariables } from '../../../../interfaces/generated/UpdateMember';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { LicenseType, MemberRole, MemberStatus } from '../../../../interfaces/generated/globalTypes';

const updatememberMutation = loader('./gql/update-member.mutation.graphql');

export const useUpdateMemberMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_updateMemberAsync, { loading, data }] = useMutation<UpdateMember, UpdateMemberVariables>(updatememberMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


  const updateMemberAsync = async (
    id: string,
    status: MemberStatus,
    firstName: string,
    lastName: string,
    email: string,
    password: string | null,
    roles: MemberRole[],
    licenseType: LicenseType,
  ): Promise<void> => {
    try {
      const variables: UpdateMemberVariables = {
        input: {
          id,
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
      await _updateMemberAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfUpdatingMember: loading,
    updateMemberAsync,
    updateMemberData: data,
    updateMemberErrorMessage: errorMessage,
  };
};
