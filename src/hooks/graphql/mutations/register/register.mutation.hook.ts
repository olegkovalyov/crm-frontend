import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { setUserAction } from '../../../../redux/auth/auth.actions';
import { Register, RegisterVariables } from '../../../../interfaces/generated/Register';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { LicenseType, UserRole, UserStatus } from '../../../../interfaces/generated/globalTypes';

const registerMutation = loader('./gql/register.mutation.graphql');

export const useRegisterMutation = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [_registerAsync, { loading, data }] = useMutation<Register, RegisterVariables>(registerMutation);

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  useEffect(() => {
    if (data) {
      dispatch(setUserAction(data.register));
    }
  }, [data, dispatch]);


  const registerAsync = async (
    status: UserStatus,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    roles: UserRole[],
    licenseType: LicenseType,
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
    inProcessOfRegister: loading,
    registerAsync,
    registerData: data,
    registerErrorMessage: errorMessage,
  };
};
