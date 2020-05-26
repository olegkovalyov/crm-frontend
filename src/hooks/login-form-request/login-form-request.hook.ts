import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';
import { IGraphQlError } from '../../interfaces/auth.interface';
import { Login, LoginVariables } from '../../interfaces/generated/Login';
import { setUserAction } from '../../redux/auth/auth.actions';

export const useLoginFormRequest = () => {

  const dispatch = useDispatch();
  const loginMutation = loader('./gql/mutationLogin.graphql');

  const [errorMessage, setErrorMessage] = useState('');
  // eslint-disable-next-line @typescript-eslint/camelcase
  const [_loginAsync, { loading, data }] = useMutation<Login, LoginVariables>(loginMutation);

  if (data) {
    dispatch(setUserAction(data.login));
  }

  const loginAsync = async (email: string, password: string): Promise<void> => {
    try {
      const variables: LoginVariables = {
        input: {
          email,
          password,
        },
      };
      await _loginAsync({
        variables,
      });
    } catch (e) {
      e.graphQLErrors.map((x: IGraphQlError) => setErrorMessage(x.message));
    }
  };

  /*
  const dispatch = useDispatch();
  const isLoading = useSelector((state: IRootState) => needShowSpinner(state));
  const errorMessage = useSelector((state: IRootState) => getLoginFormError(state));
  const loginAsync = (e: React.MouseEvent, email: string, password: string) => {
    e.preventDefault();
    dispatch(loginStartAction({ email, password }));
  };

  return {
    isLoading,
    errorMessage,
    loginAsync,
  };
   */

  return {
    loading,
    loginAsync,
    data,
    errorMessage,
  };
};
