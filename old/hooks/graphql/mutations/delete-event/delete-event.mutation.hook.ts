import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/common/auth/auth.selector';
import {
  DeleteEvent,
  DeleteEventVariables } from '../../../../interfaces/generated/DeleteEvent';
import { EventInterface } from '../../../../interfaces/event.interface';
import deleteEventMutation from './gql/delete-event.mutation.graphql';

export const useDeleteEventMutation = () => {
  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [_deleteEventAsync, { loading, data }] = useMutation<DeleteEvent, DeleteEventVariables>(deleteEventMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });

  const deleteEventAsync = async (id: number): Promise<void> => {
    try {
      const variables: DeleteEventVariables = {
        id,
      };
      setErrorMessage(null);
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
    handleDeleteEvent: deleteEventAsync,
    deletedEvent: data ? (data.deleteEvent as EventInterface) : null,
    deleteEventErrorMessage: errorMessage,
  };
};
