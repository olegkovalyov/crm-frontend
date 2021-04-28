import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import gql from 'graphql-tag';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { DeleteEvent, DeleteEventVariables } from '../../../../interfaces/generated/DeleteEvent';

export const deleteEventMutation = gql`
    mutation DeleteEvent($input: Int!) {
        deleteEvent(id: $input) {
            id,
            title,
            startDate,
            endDate,
        }
    }
`;
export const useDeleteEventMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
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
    handleDeleteEvent: deleteEventAsync,
    deletedEvent: data ? data.deleteEvent : null,
    deleteEventErrorMessage: errorMessage,
  };
};
