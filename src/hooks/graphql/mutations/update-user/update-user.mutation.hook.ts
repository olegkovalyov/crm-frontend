import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import {
  UpdateUser,
  UpdateUserVariables,
} from '../../../../interfaces/generated/UpdateUser';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import {
  LicenseType,
  UserRole,
  UserStatus,
} from '../../../../interfaces/generated/globalTypes';
import { UserInterface } from '../../../../interfaces/user.interface';
import updateUserMutation from './gql/update-user.mutation.graphql';

export const useUpdateUserMutation = () => {
  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [_updateMemberAsync, {
    loading,
    data,
  }] = useMutation<UpdateUser, UpdateUserVariables>(updateUserMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });

  const updateUserAsync = async (
    id: number,
    email: string | null,
    status: UserStatus | null,
    firstName: string | null,
    lastName: string | null,
    role: UserRole[] | null,
    licenseType: LicenseType | null,
  ): Promise<void> => {
    try {
      const variables: UpdateUserVariables = {
        user: {
          email,
          status,
          firstName,
          lastName,
          role,
          licenseType,
          id,
        },
      };
      setErrorMessage(null);
      await _updateMemberAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfUpdatingUser: loading,
    handleUpdateUser: updateUserAsync,
    updatedUser: data ? (data.updateUser as UserInterface) : null,
    updateUserErrorMessage: errorMessage,
  };
};
