import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useDispatch } from 'react-redux';
import { Login, LoginVariables } from '../../../../interfaces/generated/Login';
import { useGraphQlErrorHandler } from '../../helpers/grahhql-error-handler/grahpql-error-handler.hook';
import { setUserAction } from '../../../../redux/auth/auth.actions';
import { useRouter } from 'next/router';

const mutation = gql`
    mutation Login($input: LoginInput!) {
        login(loginInput: $input) {
            payload {
                id,
                userId,
                status,
                firstName,
                lastName,
                email,
                roles,
                licenseType,
                createdAt,
                updatedAt,
            },
            accessToken,
        }
    }
`;

export const useLoginMutation = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');
  const [runLoginMutation, { loading, data }] = useMutation<Login, LoginVariables>(mutation);

  const { getFormattedErrorMessage } = useGraphQlErrorHandler();

  useEffect(() => {
    if (data) {
      dispatch(setUserAction(data.login));
      router.push('/login');
    }
  }, [data, dispatch]); // eslint-disable-line

  const loginAsync = async (email: string, password: string): Promise<void> => {
    try {
      const variables: LoginVariables = {
        input: {
          email,
          password,
        },
      };
      await runLoginMutation({
        variables,
      });
    } catch (e) {
      const formattedErrorMessage = getFormattedErrorMessage(e);
      setErrorMessage(formattedErrorMessage);
    }
  };

  return {
    inProcessOfLogin: loading,
    loginAsync,
    loginData: data,
    loginErrorMessage: errorMessage,
  };
};
