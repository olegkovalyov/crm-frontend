import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { IRootState } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { DeleteEvent, DeleteEventVariables } from '../../../../interfaces/generated/DeleteEvent';

const deleteEventMutation = loader('./gql/delete-event.mutation.graphql');

export const useDeleteEventMutation = () => {

  const accessToken = useSelector((state: IRootState) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_deleteEventAsync, { loading, data }] = useMutation<DeleteEvent, DeleteEventVariables>(deleteEventMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


  const deleteEventAsync = async (id: string): Promise<void> => {
    try {
      const variables: DeleteEventVariables = {
        input: id,
      };
      setErrorMessage('');
      await _deleteEventAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfDeletingEvent: loading,
    deleteEventAsync,
    deletedEventData: data,
    deleteEventErrorMessage: errorMessage,
  };
};
