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
import { MemberInterface } from '../../../../interfaces/member.interface';

export const deleteMemberMutation = gql`
    mutation DeleteMember($input: Int!) {
        deleteMember(id: $input) {
            id,
            userId,
            status,
            email,
            firstName,
            lastName,
            roles,
            licenseType,
            createdAt,
            updatedAt,
        }
    }
`;

export const useDeleteMemberMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const members = useSelector((state: RootStateInterface) => getMembers(state));

  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
      setErrorMessage(null);
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
    deletedMember: data ? (data.deleteMember as MemberInterface) : null,
    deleteMemberErrorMessage: errorMessage,
  };
};
