import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/common/auth/auth.selector';
import { LoadStatus } from '../../../../interfaces/generated/globalTypes';
import {
  CreateLoad,
  CreateLoadVariables,
} from '../../../../interfaces/generated/CreateLoad';
import createLoadMutation from './gql/create-load.mutation.graphql';

export const useCreateLoadMutation = () => {
  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [_createLoadAsync, { loading, data }] = useMutation<CreateLoad, CreateLoadVariables>(createLoadMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });

  const createLoadAsync = async (
    eventId: number,
    capacity: number,
    status: LoadStatus,
    takeOffTime: Date | null,
    landingTime: Date | null,
    info: string | null,
  ): Promise<void> => {
    try {
      const variables: CreateLoadVariables = {
        load: {
          eventId,
          capacity,
          status,
          takeOffTime,
          landingTime,
          info,
        },
      };
      setErrorMessage(null);
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
