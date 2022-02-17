import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import {
  UpdateEvent,
  UpdateEventVariables,
} from '../../../../interfaces/generated/UpdateEvent';
import updateEventMutation from './gql/update-event.mutation.graphql';

export const useUpdateEventMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [_updateEventAsync, { loading, data }] = useMutation<UpdateEvent, UpdateEventVariables>(updateEventMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


  const updateEventAsync = async (
    id: number,
    name: string | null,
    startDate: Date | null,
    endDate: Date | null,
    info: string | null,
  ): Promise<void> => {
    try {
      const variables: UpdateEventVariables = {
        event: {
          id,
          name,
          startDate,
          endDate,
          info,
        },
      };
      setErrorMessage(null);
      await _updateEventAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfUpdatingEvent: loading,
    handleUpdateEvent: updateEventAsync,
    updatedEvent: data ? data.updateEvent : null,
    updateEventErrorMessage: errorMessage,
  };
};
