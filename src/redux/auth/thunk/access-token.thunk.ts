import { createAsyncThunk } from '@reduxjs/toolkit';
import { initializeApollo } from '../../../graphql/client/graphql.client';
import { AccessToken } from '../../../interfaces/generated/AccessToken';
import accessTokenQuery from '/src/graphql/query/access-token.query.graphql';
import {
  AccessTokenThunkInputInterface,
} from '../../../interfaces/redux/thunk.interface';
import { setAuth, resetAuth } from '../reducer/auth.reducer';
import Router from'next/router';
import { ROUTE_LOG_IN } from '../../../constants/route.constants';

export const accessTokenThunk = createAsyncThunk(
  'auth/access-token',
  async (data: AccessTokenThunkInputInterface, api) => {
    const client = initializeApollo();
    try {
      const result = await client.query<AccessToken, null>({
        query: accessTokenQuery,
      });
      if (result.data) {
        console.log('success fulfilled access token: ');
        api.dispatch(setAuth(result.data.accessToken));
      } else {
        console.log('failed to fulfill access token. reset everything...');
        api.dispatch(resetAuth());
        Router.push(ROUTE_LOG_IN);
      }
    } catch (e) {
      console.log('failed to fulfill access token. reset everything...');
      api.dispatch(resetAuth());
      Router.push(ROUTE_LOG_IN);
    }
  },
);
