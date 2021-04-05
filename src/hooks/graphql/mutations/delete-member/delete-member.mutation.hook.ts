import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import gql from 'graphql-tag';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { DeleteMember, DeleteMemberVariables } from '../../../../interfaces/generated/DeleteMember';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { getMembers } from '../../../../redux/members/members.selector';
import { setMembersAction } from '../../../../redux/members/members.actions';

export const deleteMemberMutation = gql`
    mutation DeleteMember($input: Int!) {
        deleteMember(id: $input)
    }
`;

export const useDeleteMemberMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const members = useSelector((state: RootStateInterface) => getMembers(state));

  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState('');
  const [_deleteMemberAsync, {
    loading,
    data,
  }] = useMutation<DeleteMember, DeleteMemberVariables>(deleteMemberMutation, {
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
      const updatedMembers = members.filter(member => member.id !== id);
      dispatch(setMembersAction(updatedMembers));
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfDeletingMember: loading,
    handleDeleteMember: deleteMemberAsync,
    deletedMemberData: data,
    deleteMemberErrorMessage: errorMessage,
  };
};
