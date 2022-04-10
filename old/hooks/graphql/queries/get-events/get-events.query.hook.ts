import { useLazyQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/common/auth/auth.selector';
import { GetEvents, GetEventsVariables } from '../../../../interfaces/generated/GetEvents';
import { EventInterface } from '../../../../interfaces/event.interface';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { setEventsAction } from '../../../../redux/events/events.actions';
import getEventsQuery from './gql/get-events.query.graphql';

export const useGetEventsQuery = () => {
  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const dispatch = useDispatch();

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  let events: EventInterface[] | null = null;
  const [_getEventsAsync, { loading, data }] = useLazyQuery<GetEvents, GetEventsVariables>(getEventsQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
      onCompleted: (eventsData) => {
        const preparedEvents = eventsData.getEvents.map(event => ({
          ...event,
          startDate: new Date(event.startDate),
          endDate: new Date(event.endDate),
        }));
        dispatch(setEventsAction(preparedEvents));
      },
    });

  if (data && data.getEvents) {
    events = data.getEvents.map(item => ({ ...item }));
  }

  const getEventsAsync = async (
    name: string | null,
    startDateMin: Date | null,
    startDateMax: Date | null,
    endDateMin: Date | null,
    endDateMax: Date | null,
  ) => {
    const variables: GetEventsVariables = {
      getEvents: {
        name,
        startDateMin,
        startDateMax,
        endDateMin,
        endDateMax,
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
    handleGetEvents: getEventsAsync,
  };
};
