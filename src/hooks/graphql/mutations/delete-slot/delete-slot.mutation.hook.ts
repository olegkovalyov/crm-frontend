import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import {
  DeleteSlot,
  DeleteSlotVariables,
} from '../../../../interfaces/generated/DeleteSlot';
import deleteSlotMutation from './gql/delete-slot.mutation.graphql';

export const useDeleteSlotMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [_deleteSlotAsync, { loading, called }] = useMutation<DeleteSlot, DeleteSlotVariables>(deleteSlotMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });

  let wasDeleted = false;


  const deleteSlotAsync = async (id: number): Promise<void> => {
    wasDeleted = false;
    setErrorMessage('');
    try {
      const variables: DeleteSlotVariables = {
        id,
      };
      setErrorMessage(null);
      const result = await _deleteSlotAsync({
        variables,
      });
      if (result?.data?.deleteSlot) {
        wasDeleted = true;
      }
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfDeletingSlot: loading,
    deleteSlotAsync,
    wasDeleted,
    wasCalledDeleteSlot: called,
    deleteSlotErrorMessage: errorMessage,
  };
};
