import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  RegisterUser,
  RegisterUserVariables,
} from '../../../../interfaces/generated/RegisterUser';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import {
  LicenseType,
  UserRole,
  UserStatus,
} from '../../../../interfaces/generated/globalTypes';
import registerMutation from './gql/register.mutation.graphql';

export const useRegisterMutation = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [_registerAsync, { loading, data }] = useMutation<RegisterUser, RegisterUserVariables>(registerMutation);

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();


  const registerAsync = async (
    email: string,
    password: string,
    status: UserStatus,
    firstName: string,
    lastName: string,
    role: UserRole[],
    licenseType: LicenseType,
  ): Promise<void> => {
    try {
      const variables: RegisterUserVariables = {
        user: {
          email,
          password,
          status,
          firstName,
          lastName,
          role,
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
