import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { CreateUser, CreateUserVariables } from '../../../../interfaces/generated/CreateUser';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { IRootState } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { LicenseType, UserRole, UserStatus } from '../../../../interfaces/generated/globalTypes';

const createUserMutation = loader('./gql/create-user.mutation.graphql');

export const useCreateUserMutation = () => {

  const accessToken = useSelector((state: IRootState) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_createUserAsync, { loading, data }] = useMutation<CreateUser, CreateUserVariables>(createUserMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


  const createUserAsync = async (
    status: UserStatus,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    roles: UserRole[],
    licenseType: LicenseType,
  ): Promise<void> => {
    try {
      const variables: CreateUserVariables = {
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
      await _createUserAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfCreatingUser: loading,
    createUserAsync,
    userData: data,
    createUserErrorMessage: errorMessage,
  };
};
