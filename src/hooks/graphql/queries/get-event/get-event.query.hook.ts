import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { IRootState } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { GetEvent, GetEventVariables } from '../../../../interfaces/generated/GetEvent';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';

const getEventQuery = loader('./gql/get-event.query.graphql');

export const useGetEventQuery = () => {

  const accessToken = useSelector((state: IRootState) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  const [_getEventAsync, { loading, data }] = useLazyQuery<GetEvent, GetEventVariables>(getEventQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
    });


  const getEventAsync = async (eventId: string) => {
    const variables: GetEventVariables = {
      eventId,
    };
    try {
      await _getEventAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    isEventLoading: loading,
    getEventErrorMessage: errorMessage,
    eventData: data,
    getEventAsync,
  };
};
