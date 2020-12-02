import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { DeleteSlot, DeleteSlotVariables } from '../../../../interfaces/generated/DeleteSlot';

const deleteSlotMutation = loader('./gql/delete-slot.mutation.graphql');

export const useDeleteLoadMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_deleteSlotAsync, { loading, data }] = useMutation<DeleteSlot, DeleteSlotVariables>(deleteSlotMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


  const deleteLoadAsync = async (id: number): Promise<void> => {
    try {
      const variables: DeleteSlotVariables = {
        id,
      };
      setErrorMessage('');
      await _deleteSlotAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfDeletingSlot: loading,
    deleteLoadAsync,
    loadData: data,
    deleteSlotErrorMessage: errorMessage,
  };
};
