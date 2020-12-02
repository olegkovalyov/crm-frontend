import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useSelector } from 'react-redux';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { RootStateInterface } from '../../../../redux/root.reducer';
import { getAccessToken } from '../../../../redux/auth/auth.selector';
import { UserRole } from '../../../../interfaces/generated/globalTypes';
import { CreateSlot, CreateSlotVariables } from '../../../../interfaces/generated/CreateSlot';
import { LoadInterface } from '../../../../interfaces/load.interface';

const createSlotMutation = loader('./gql/create-slot.mutation.graphql');

export const useCreateSlotMutation = () => {

  const accessToken = useSelector((state: RootStateInterface) => getAccessToken(state));
  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  const [errorMessage, setErrorMessage] = useState('');
  const [_createSlotAsync, { loading, data }] = useMutation<CreateSlot, CreateSlotVariables>(createSlotMutation, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    },
  });

  let updatedLoad: LoadInterface | null = null;
  if (data) {
    updatedLoad = data.createSlot;
  }


  const createSlotAsync = async (
    loadId: number,
    userId: number,
    firstName: string,
    lastName: string,
    role: UserRole,
    description: string,
  ): Promise<void> => {
    try {
      const variables: CreateSlotVariables = {
        input: {
          loadId,
          userId,
          firstName,
          lastName,
          role,
          description,
        },
      };
      setErrorMessage('');
      await _createSlotAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfCreatingSlot: loading,
    createSlotAsync,
    updatedLoad,
    createSlotErrorMessage: errorMessage,
  };
};
