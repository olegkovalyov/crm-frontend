import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { DeleteMember, DeleteMemberVariables } from '../../../../interfaces/generated/DeleteMember';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';

const deleteMemberMutation = loader('./gql/delete-member.mutation.graphql');

export const useDeleteMemberMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_deleteMemberAsync, { loading, data }] = useMutation<DeleteMember, DeleteMemberVariables>(deleteMemberMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


  const deleteMemberAsync = async (id: string): Promise<void> => {
    try {
      const variables: DeleteMemberVariables = {
        input: id,
      };
      setErrorMessage('');
      await _deleteMemberAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfDeletingMember: loading,
    deleteMemberAsync,
    deletedUserData: data,
    deleteUserErrorMessage: errorMessage,
  };
};
