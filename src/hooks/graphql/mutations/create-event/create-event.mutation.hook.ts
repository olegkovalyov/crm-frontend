import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import {
  CreateEvent,
  CreateEventVariables,
} from '../../../../interfaces/generated/CreateEvent';
import { EventInterface } from '../../../../interfaces/event.interface';
import createEventMutation from './gql/create-event.mutation.graphql';

export const useCreateEventMutation = () => {
  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [_createEventAsync, { loading, data }] = useMutation<CreateEvent, CreateEventVariables>(createEventMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });

  const createEventAsync = async (
    name: string,
    startDate: Date,
    endDate: Date,
    info: string,
  ): Promise<void> => {
    try {
      const variables: CreateEventVariables = {
        event: {
          name,
          startDate,
          endDate,
          info,
        },
      };
      setErrorMessage(null);
      await _createEventAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfCreatingEvent: loading,
    handleCreateEvent: createEventAsync,
    createdEvent: data ? (data.createEvent as EventInterface) : null,
    createEventErrorMessage: errorMessage,
  };
};
