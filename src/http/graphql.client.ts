import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:5000/graphql',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link,
});
