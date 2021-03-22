import { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Register, RegisterVariables } from '../../../../interfaces/generated/Register';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { LicenseType, MemberRole, MemberStatus } from '../../../../interfaces/generated/globalTypes';

const mutation = gql`
    mutation Register($input: CreateMemberInput!) {
        register(registerInput: $input){
            payload{
                id,
                userId,
                status,
                firstName,
                lastName,
                email,
                roles,
                licenseType,
                createdAt,
                updatedAt,
            },
            accessToken
        }
    }
`;

export const useRegisterMutation = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [_registerAsync, { loading, data }] = useMutation<Register, RegisterVariables>(mutation);

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();


  const registerAsync = async (
    status: MemberStatus,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    roles: MemberRole[],
    licenseType: LicenseType,
  ): Promise<void> => {
    try {
      const variables: RegisterVariables = {
        input: {
          status,
          email,
          password,
          firstName,
          lastName,
          roles,
          licenseType,
        },
      };
      await _registerAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfRegister: loading,
    handleRegister: registerAsync,
    registerData: data,
    registerErrorMessage: errorMessage,
  };
};
