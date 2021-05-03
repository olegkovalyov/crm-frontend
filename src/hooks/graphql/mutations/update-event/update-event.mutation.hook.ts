import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import gql from 'graphql-tag';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { UpdateEvent, UpdateEventVariables } from '../../../../interfaces/generated/UpdateEvent';

const updateEventMutation = gql`
    mutation UpdateEvent($event: UpdateEventInput!){
        updateEvent(updateEventInput: $event){
            id,
            title,
            startDate,
            endDate,
            notes
        }
    }
`;

export const useUpdateEventMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
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
    id: number,
    title: string,
    startDate: Date,
    endDate: Date,
    notes: string,
  ): Promise<void> => {
    try {
      const variables: UpdateEventVariables = {
        event: {
          id,
          title,
          startDate,
          endDate,
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
    inProcessOfUpdatingEvent: loading,
    handleUpdateEvent: updateEventAsync,
    updatedEvent: data ? data.updateEvent : null,
    updateEventErrorMessage: errorMessage,
  };
};
