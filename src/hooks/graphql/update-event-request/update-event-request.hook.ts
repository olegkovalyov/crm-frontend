import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../grahhql-error-handler/grahpql-error-handler.hook';
import { IRootState } from '../../../redux/root.reducer';
import { getAccessToken } from '../../../redux/auth/auth.selector';
import { UpdateEvent, UpdateEventVariables } from '../../../interfaces/generated/UpdateEvent';

const updateEventMutation = loader('./gql/mutationUpdateEvent.graphql');

export const useUpdateEventRequest = () => {

  const accessToken = useSelector((state: IRootState) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_updateEventAsync, { loading, data }] = useMutation<UpdateEvent, UpdateEventVariables>(updateEventMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


  const updateEventAsync = async (
    id: string,
    name: string,
    date: Date,
    notes: string,
  ): Promise<void> => {
    try {
      const variables: UpdateEventVariables = {
        input: {
          id,
          name,
          date,
          notes,
        },
      };
      setErrorMessage('');
      await _updateEventAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    loading,
    updateEventAsync,
    updatedEventData: data,
    updateErrorMessage: errorMessage,
  };
};
