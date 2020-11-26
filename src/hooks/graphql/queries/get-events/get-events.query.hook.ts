import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { GetEvents, GetEventsVariables } from '../../../../interfaces/generated/GetEvents';
import { EventInterface } from '../../../../interfaces/event.interface';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';

const getEventsQuery = loader('./gql/get-events.query.graphql');

export const useGetEventsQuery = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  let events: EventInterface[] = [];
  const [_getEventsAsync, { loading, data }] = useLazyQuery<GetEvents, GetEventsVariables>(getEventsQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
    });

  if (data && data.getEvents) {
    events = data.getEvents.map(item => {
      return { ...item };
    });
  }

  const getEventsAsync = async (dateMin: Date | null, dateMax: Date | null) => {
    const variables: GetEventsVariables = {
      getEventsFilter: {
        dateMin,
        dateMax,
      },
    };
    try {
      await _getEventsAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };


  return {
    areEventsLoading: loading,
    getEventsErrorMessage: errorMessage,
    eventsData: events,
    getEventsAsync,
  };
};
