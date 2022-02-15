import { NextPageContext } from 'next';
import gql from 'graphql-tag';
import { ApolloQueryResult } from '@apollo/client';
import { initializeApollo } from '../http/graphql.client';
import { RefreshToken } from '../interfaces/generated/RefreshToken';

export const handleAccessToken = async (context: NextPageContext) => {
  const cookie = require('cookie');

  const response = {
    user: null,
    accessToken: null,
    message: null,
  };

  if (context.req.headers.cookie) {
    const cookies = cookie.parse(context.req.headers.cookie);
    if (cookies.refreshToken) {
      const client = initializeApollo();
      const refreshTokenQuery = gql`
          query RefreshToken {
              refreshToken {
                  payload{
                      id,
                      firstName,
                      lastName,
                  },
                  accessToken
              }
          }
      `;
      try {
        const result: ApolloQueryResult<RefreshToken> = await client.query({
          query: refreshTokenQuery,
          context: {
            headers: {
              refreshToken: cookies.refreshToken,
            },
          },
        });
        response.user = result.data.refreshToken.payload;
        response.accessToken = result.data.refreshToken.accessToken;
      } catch (e) {
        response.message = e.message;
      }
    }
  }

  return response;
};
