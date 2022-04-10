import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject, DefaultOptions } from '@apollo/client';
import ApolloLinkTimeout from 'apollo-link-timeout';
import { onError } from '@apollo/client/link/error';

let apolloClient;

export function createApolloClient() {
  const endpoint = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;
  const httpLink = new HttpLink({
    uri: endpoint,
    credentials: 'include',
  });
  const timeout = parseInt(process.env.NEXT_PUBLIC_BACKEND_TIMEOUT);
  const timeoutLink = new ApolloLinkTimeout(timeout);

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (networkError) {
      networkError.message = `[Network error]: Oops! Try again later...`;
    }
  });

  const link = timeoutLink.concat(errorLink).concat(httpLink);

  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'none',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    mutate: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  };

  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // set to true for SSR
    link,
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
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
