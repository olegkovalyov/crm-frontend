import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { loader } from 'graphql.macro';
import {
  CreateUser,
  CreateUserVariables,
} from '../../../../interfaces/generated/CreateUser';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import {
  LicenseType,
  UserRole,
  UserStatus,
} from '../../../../interfaces/generated/globalTypes';
import { UserInterface } from '../../../../interfaces/user.interface';

const createUserMutation = loader('./gql/create-user.mutation.graphql');

export const useCreateUserMutation = () => {
  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [_createUserAsync, { loading, data }] = useMutation<CreateUser, CreateUserVariables>(createUserMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


  const createUserAsync = async (
    email: string,
    password: string,
    status: UserStatus,
    firstName: string,
    lastName: string,
    role: UserRole[],
    licenseType: LicenseType,
  ): Promise<void> => {
    try {
      const variables: CreateUserVariables = {
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
      setErrorMessage(null);
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
    handleCreateUser: createUserAsync,
    createdUser: data ? (data.createUser as UserInterface) : null,
    createUserErrorMessage: errorMessage,
  };
};
