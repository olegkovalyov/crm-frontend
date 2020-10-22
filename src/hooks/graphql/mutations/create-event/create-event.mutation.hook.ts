import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { IRootState } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { CreateEvent, CreateEventVariables } from '../../../../interfaces/generated/CreateEvent';

const createEventMutation = loader('./gql/create-event.mutation.graphql');

export const useCreateEventMutation = () => {

  const accessToken = useSelector((state: IRootState) => getAccessToken(state));
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
    name: string,
    date: Date,
    notes: string,
    staffIds: string[],
  ): Promise<void> => {
    try {
      const variables: CreateEventVariables = {
        input: {
          name,
          date,
          notes,
          staffIds,
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
    createEventAsync,
    eventsData: data,
    createEventErrorMessage: errorMessage,
  };
};
