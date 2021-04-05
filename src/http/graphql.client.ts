import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from '@apollo/client';
import ApolloLinkTimeout from 'apollo-link-timeout';

let apolloClient;

export function createApolloClient() {
  const endpoint = typeof window === 'undefined' ? 'http://localhost:5000/graphql' : '/graphql';
  const httpLink = new HttpLink({
    uri: endpoint,
    credentials: 'same-origin',
  });
  const timeoutLink = new ApolloLinkTimeout(10000); // 10 second timeout

  const link = timeoutLink.concat(httpLink);

  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // set to true for SSR
    link,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient: ApolloClient<NormalizedCacheObject> = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}
