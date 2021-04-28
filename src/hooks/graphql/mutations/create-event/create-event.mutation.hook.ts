import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import gql from 'graphql-tag';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { CreateEvent, CreateEventVariables } from '../../../../interfaces/generated/CreateEvent';
import { EventInterface } from '../../../../interfaces/event.interface';

const createEventMutation = gql`
    mutation CreateEvent($input: CreateEventInput!) {
        createEvent(createEventInput: $input)
        {
            id,
            title
            startDate,
            endDate
        }
    }
`;
export const useCreateEventMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_createEventAsync, { loading, data }] = useMutation<CreateEvent, CreateEventVariables>(createEventMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


  const createEventAsync = async (
    title: string,
    startDate: Date,
    endDate: Date,
  ): Promise<void> => {
    try {
      const variables: CreateEventVariables = {
        input: {
          title,
          startDate,
          endDate,
        },
      };
      setErrorMessage('');
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
