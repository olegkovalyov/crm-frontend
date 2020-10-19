import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../redux/root.reducer';
import { getAccessToken } from '../../../redux/auth/auth.selector';
import { GetEvents, GetEvents_getEvents } from '../../../interfaces/generated/GetEvents';
import { EventInterface } from '../../../interfaces/event.interface';

const eventsQuery = loader('./gql/queryGetEvents.graphql');

export const useGetEventsRequest = () => {

  const accessToken = useSelector((state: IRootState) => getAccessToken(state));

  let events: GetEvents_getEvents[] = [];
  const [getEventsAsync, { loading, data, error }] = useLazyQuery<GetEvents, null>(eventsQuery,
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


  return {
    loading,
    events,
    error,
    getEventsAsync,
  };
};
