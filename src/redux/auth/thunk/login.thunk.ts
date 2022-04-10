import { createAsyncThunk } from '@reduxjs/toolkit';
import { initializeApollo } from '../../../graphql/client/graphql.client';
import { Login, LoginVariables } from '../../../interfaces/generated/Login';
import loginMutation from '/src/graphql/mutation/login.mutation.graphql';
import {
  LoginThunkInputInterface,
} from '../../../interfaces/redux/thunk.interface';
import { setAuth } from '../reducer/auth.reducer';
import { setLoginErrorMessage, setLoginPending } from '../../pages/login/reducer/login-page.reducer';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data: LoginThunkInputInterface, api) => {
    const client = initializeApollo();
    try {
      api.dispatch(setLoginPending(true));
      api.dispatch(setLoginErrorMessage(null));

      const result = await client.mutate<Login, LoginVariables>({
        mutation: loginMutation,
        variables: {
          input: {
            email: data.email,
            password: data.password,
          },
        },
      });
      if (result.data !== null) {
        api.dispatch(setAuth(result.data.login));
      } else {
        api.dispatch(setLoginErrorMessage(result.errors[0].message));
      }
    } catch (e) {
      api.dispatch(setLoginErrorMessage(e.message));
    } finally {
      api.dispatch(setLoginPending(false));
    }
  },
);