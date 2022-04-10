import { createAsyncThunk } from '@reduxjs/toolkit';
import { initializeApollo } from '../../../graphql/client/graphql.client';
import { WritableDraft } from 'immer/dist/types/types-external';
import { Logout } from '../../../interfaces/generated/Logout';
import logoutQuery from '/src/graphql/query/logout.query.graphql';
import { resetAuth } from '../reducer/auth.reducer';
import { RootStateInterface } from '../../store';
import Router from 'next/router';
import { ROUTE_LOG_IN } from '../../../constants/route.constants';

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (data, api) => {
    const client = initializeApollo();
    try {
      await client.query<Logout, null>({
        query: logoutQuery,
      });
    } finally {
      const state = api.getState() as RootStateInterface;
      window.clearInterval(state.auth.accessTokenUpdateIntervalId);
      api.dispatch(resetAuth());
      Router.push(ROUTE_LOG_IN);
    }
  },
);

