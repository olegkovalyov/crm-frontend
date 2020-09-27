import { ApolloClient, InMemoryCache, NormalizedCacheObject, HttpLink } from '@apollo/client';


const cache = new InMemoryCache();
const link = new HttpLink({
  uri: '/graphql',
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link,
});
