import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { IGraphQlError } from '../../interfaces/auth.interface';
import { setUserAction } from '../../redux/auth/auth.actions';
import { Register, RegisterVariables } from '../../interfaces/generated/Register';

export const useRegisterFormRequest = () => {
  const dispatch = useDispatch();
  const registerMutation = loader('./gql/mutationRegister.graphql');

  const [errorMessage, setErrorMessage] = useState('');
  const [_registerAsync, { loading, data }] = useMutation<Register, RegisterVariables>(registerMutation);

  useEffect(() => {
    if (data) {
      dispatch(setUserAction(data.register));
    }
  }, [data, dispatch]);


  const registerAsync = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string,
    licenseType: string | null,
  ): Promise<void> => {
    try {
      const variables: RegisterVariables = {
        input: {
          email,
          password,
          firstName,
          lastName,
          role,
          licenseType,
        },
      };
      await _registerAsync({
        variables,
      });
    } catch (e) {
      e.graphQLErrors.map((x: IGraphQlError) => setErrorMessage(x.message));
    }
  };

  return {
    loading,
    registerAsync,
    data,
    errorMessage,
  };
};
