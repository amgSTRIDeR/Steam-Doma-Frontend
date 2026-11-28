import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { CombinedGraphQLErrors, ServerError } from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';
import { GRAPHQL_URL } from './api';

export const AUTH_REQUIRED_EVENT = 'apollo:auth-required';
export const ACCESS_DENIED_EVENT = 'apollo:access-denied';
export const AUTHENTICATED_CONTEXT = { requiresAuth: true } as const;

function dispatchAuthEvent(eventName: string): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(eventName));
  }
}

export function createApolloClient(fetchImplementation?: typeof fetch) {
  const fetchOption = fetchImplementation ? { fetch: fetchImplementation } : {};
  const publicLink = new HttpLink({
    uri: GRAPHQL_URL,
    credentials: 'omit',
    ...fetchOption,
  });
  const authenticatedLink = new HttpLink({
    uri: GRAPHQL_URL,
    credentials: 'include',
    ...fetchOption,
  });
  const httpLink = ApolloLink.split(
    (operation) => operation.getContext().requiresAuth === true,
    authenticatedLink,
    publicLink,
  );
  const errorLink = new ErrorLink(({ error }) => {
    const statusCode = ServerError.is(error) ? error.statusCode : undefined;
    const graphQLErrorCodes = CombinedGraphQLErrors.is(error)
      ? error.errors.map((graphQLError) => graphQLError.extensions?.code)
      : [];

    if (statusCode === 401 || graphQLErrorCodes.includes('UNAUTHENTICATED')) {
      dispatchAuthEvent(AUTH_REQUIRED_EVENT);
    } else if (statusCode === 403 || graphQLErrorCodes.includes('FORBIDDEN')) {
      dispatchAuthEvent(ACCESS_DENIED_EVENT);
    }
  });

  return new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
}

export const apolloClient = createApolloClient();
