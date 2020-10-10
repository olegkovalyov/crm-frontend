import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { setUserAction } from '../../../redux/auth/auth.actions';
import { Register, RegisterVariables } from '../../../interfaces/generated/Register';
import { useGraphQlErrorHandler } from '../grahhql-error-handler/grahpql-error-handler.hook';

export const useRegisterRequest = () => {
  const dispatch = useDispatch();
  const registerMutation = loader('./gql/mutationRegister.graphql');

  const [errorMessage, setErrorMessage] = useState('');
  const [_registerAsync, { loading, data }] = useMutation<Register, RegisterVariables>(registerMutation);

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  useEffect(() => {
    if (data) {
      dispatch(setUserAction(data.register));
    }
  }, [data, dispatch]);


  const registerAsync = async (
    status: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    roles: string[],
    licenseType: string,
  ): Promise<void> => {
    try {
      const variables: RegisterVariables = {
        input: {
          status,
          email,
          password,
          firstName,
          lastName,
          roles,
          licenseType,
        },
      };
      await _registerAsync({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    loading,
    registerAsync,
    data,
    errorMessage,
  };
};
