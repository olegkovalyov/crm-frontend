import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import {
  DeleteLoad,
  DeleteLoadVariables,
} from '../../../../interfaces/generated/DeleteLoad';

const deleteLoadMutation = loader('./gql/delete-load.mutation.graphql');

export const useDeleteLoadMutation = () => {
  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [_deleteLoadAsync, { loading, data }] = useMutation<DeleteLoad, DeleteLoadVariables>(deleteLoadMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });

  const deleteLoadAsync = async (id: number): Promise<void> => {
    try {
      const variables: DeleteLoadVariables = {
        id,
      };
      setErrorMessage(null);
      await _deleteLoadAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfDeletingLoad: loading,
    deleteLoadAsync,
    deletedLoadData: data,
    deleteLoadErrorMessage: errorMessage,
  };
};
