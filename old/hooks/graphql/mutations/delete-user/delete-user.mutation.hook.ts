import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/common/auth/auth.selector';
import { getUsers } from '../../../../redux/users/users.selector';
import { setUsersAction } from '../../../../redux/users/users.actions';
import { UserInterface } from '../../../../interfaces/user.interface';
import {
  DeleteUser,
  DeleteUserVariables,
} from '../../../../interfaces/generated/DeleteUser';
import deleteUserMutation from './gql/delete-user.mutation.graphql';

export const useDeleteUserMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const users = useSelector((state: RootStateInterface) => getUsers(state));

  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [_deleteUserAsync, {
    loading,
    data,
  }] = useMutation<DeleteUser, DeleteUserVariables>(deleteUserMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


  const deleteUserAsync = async (id: number): Promise<void> => {
    try {
      const variables: DeleteUserVariables = {
        id,
      };
      setErrorMessage(null);
      await _deleteUserAsync({
        variables,
      });
      const updatedUsers = users.filter(user => user.id !== id);
      dispatch(setUsersAction(updatedUsers));
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfDeletingUser: loading,
    handleDeleteUser: deleteUserAsync,
    deletedUser: data ? (data.deleteUser as UserInterface) : null,
    deleteUserErrorMessage: errorMessage,
  };
};
