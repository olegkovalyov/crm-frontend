import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { IRootState } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { GetEvents, GetEvents_getEvents } from '../../../../interfaces/generated/GetEvents';
import { EventInterface } from '../../../../interfaces/event.interface';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';

const getEventsQuery = loader('./gql/get-events.query.graphql');

export const useGetEventsQuery = () => {

  const accessToken = useSelector((state: IRootState) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  let events: GetEvents_getEvents[] = [];
  const [_getEventsAsync, { loading, data }] = useLazyQuery<GetEvents, null>(getEventsQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
    });

  if (data && data.getEvents) {
    events = data.getEvents.filter(x => x != null) as EventInterface[];
    events = events.map(x => {
      const event = { ...x };
      const date = new Date(x.date);
      event.date = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      return event;
    });
  }

  const getEventsAsync = async () => {
    try {
      await _getEventsAsync();
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
