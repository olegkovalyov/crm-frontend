import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { GetEvent, GetEventVariables } from '../../../../interfaces/generated/GetEvent';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { EventInterface } from '../../../../interfaces/event.interface';
import { StaffInterface } from '../../../../interfaces/member.interface';

const getEventQuery = loader('./gql/get-event.query.graphql');

export const useGetEventQuery = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  const [_getEventAsync, { loading, data, called }] = useLazyQuery<GetEvent, GetEventVariables>(getEventQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
    });


  let event: EventInterface | null = null;
  let staff: StaffInterface[] = [];

  if (data && data.getEvent) {
    event = data.getEvent;
  }

  if (data && data.getStaff) {
    staff = data.getStaff;
  }

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
    setEventErrorMessage: setErrorMessage,
    wasEventLoadCalled: called,
    event,
    staff,
    getEventAsync,
  };
};
