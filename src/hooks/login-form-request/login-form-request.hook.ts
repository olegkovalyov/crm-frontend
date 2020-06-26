import { useEffect, useState } from 'react';
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
  const [_loginAsync, { loading, data }] = useMutation<Login, LoginVariables>(loginMutation);


  useEffect(() => {
    if (data) {
      dispatch(setUserAction(data.login));
      localStorage.setItem('token', data.login.token);
    }
  }, [data, dispatch]);

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

  return {
    loading,
    loginAsync,
    data,
    errorMessage,
  };
};
