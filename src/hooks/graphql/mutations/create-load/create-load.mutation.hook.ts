import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { LoadStatus } from '../../../../interfaces/generated/globalTypes';
import { CreateLoad, CreateLoadVariables } from '../../../../interfaces/generated/CreateLoad';

const createLoadMutation = loader('./gql/create-load.mutation.graphql');

export const useCreateLoadMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_createLoadAsync, { loading, data }] = useMutation<CreateLoad, CreateLoadVariables>(createLoadMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });


  const createLoadAsync = async (
    eventId: number,
    status: LoadStatus,
    date: Date,
    aircraft: string,
    notes: string | null,
    order: number,
  ): Promise<void> => {
    try {
      const variables: CreateLoadVariables = {
        input: {
          eventId,
          status,
          date,
          aircraft,
          notes,
          order,
        },
      };
      setErrorMessage('');
      await _createLoadAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfCreatingLoad: loading,
    createLoadAsync,
    loadData: data,
    createLoadErrorMessage: errorMessage,
  };
};
