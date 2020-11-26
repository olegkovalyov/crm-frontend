import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { UpdateEvent, UpdateEventVariables } from '../../../../interfaces/generated/UpdateEvent';

const updateEventMutation = loader('./gql/updateEventMutation.graphql');

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
    name: string,
    date: Date,
    notes: string,
    staffIds: number[],
  ): Promise<void> => {
    try {
      const variables: UpdateEventVariables = {
        input: {
          id,
          name,
          date,
          notes,
          staffIds,
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
    updateEventAsync,
    updateEventData: data,
    updateEventErrorMessage: errorMessage,
  };
};
