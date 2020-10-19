import { useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../redux/root.reducer';
import { getAccessToken } from '../../../redux/auth/auth.selector';
import { GetEvent, GetEventVariables } from '../../../interfaces/generated/GetEvent';

const getEventQuery = loader('./gql/queryGetEvent.graphql');

export const useGetEventRequest = (id: string) => {

  const accessToken = useSelector((state: IRootState) => getAccessToken(state));

  const [getEvent, { loading, data, error }] = useLazyQuery<GetEvent, GetEventVariables>(getEventQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
      variables: {
        input: id,
      },
    });

  return {
    isEventLoading: loading,
    eventError: error,
    eventData: data,
    getEvent,
  };
};
