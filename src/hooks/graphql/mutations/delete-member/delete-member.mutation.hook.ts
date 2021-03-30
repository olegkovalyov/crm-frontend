import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import gql from "graphql-tag";
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { DeleteMember, DeleteMemberVariables } from '../../../../interfaces/generated/DeleteMember';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';

const mutation = gql`
    mutation DeleteMember($input: Int!) {
        deleteMember(id: $input)
    }
`;

export const useDeleteMemberMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_deleteMemberAsync, { loading, data }] = useMutation<DeleteMember, DeleteMemberVariables>(mutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


  const deleteMemberAsync = async (id: number): Promise<void> => {
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
    handleDeleteMember: deleteMemberAsync,
    deletedUserData: data,
    deleteUserErrorMessage: errorMessage,
  };
};
