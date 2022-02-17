import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { GetLoad, GetLoadVariables } from '../../../../interfaces/generated/GetLoad';
import { LoadInterface } from '../../../../interfaces/load.interface';
import getLoadQuery from './gql/get-load.query.graphql';

export const useGetLoadQuery = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();
  const [errorMessage, setErrorMessage] = useState('');

  const [_getLoadAsync, { loading, data, called }] = useLazyQuery<GetLoad, GetLoadVariables>(getLoadQuery,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      },
      fetchPolicy: 'network-only',
    });

  let load: LoadInterface | null = null;

  const getLoadAsync = async (id: number) => {
    const variables: GetLoadVariables = {
      id,
    };
    try {
      await _getLoadAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  if (data && data.getLoad) {
    load = data.getLoad;
  }

  return {
    isLoadLoading: loading,
    getLoadErrorMessage: errorMessage,
    setLoadErrorMessage: setErrorMessage,
    wasMemberLoadCalled: called,
    load,
    getLoadAsync,
  };
};
