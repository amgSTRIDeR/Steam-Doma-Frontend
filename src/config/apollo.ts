import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { CombinedGraphQLErrors, ServerError } from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { GRAPHQL_URL } from './api';

export const AUTH_REQUIRED_EVENT = 'apollo:auth-required';
export const ACCESS_DENIED_EVENT = 'apollo:access-denied';
export const APOLLO_ERROR_EVENT = 'apollo:request-failed';
export const CATALOG_FILTERS_ERROR_EVENT = 'apollo:catalog-filters-failed';
export const AUTHENTICATED_CONTEXT = { requiresAuth: true } as const;

function dispatchWindowEvent(eventName: string): void {
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
  const errorLink = new ErrorLink(({ error, operation }) => {
    const statusCode = ServerError.is(error) ? error.statusCode : undefined;
    const graphQLErrorCodes = CombinedGraphQLErrors.is(error)
      ? error.errors.map((graphQLError) => graphQLError.extensions?.code)
      : [];

    if (statusCode === 401 || graphQLErrorCodes.includes('UNAUTHENTICATED')) {
      dispatchWindowEvent(AUTH_REQUIRED_EVENT);
    } else if (statusCode === 403 || graphQLErrorCodes.includes('FORBIDDEN')) {
      dispatchWindowEvent(ACCESS_DENIED_EVENT);
    } else {
      console.error('[Apollo] GraphQL request failed:', error);
      dispatchWindowEvent(
        operation.operationName === 'GetCategories'
          ? CATALOG_FILTERS_ERROR_EVENT
          : APOLLO_ERROR_EVENT,
      );
    }
  });
  const retryLink = new RetryLink({
    attempts: {
      max: 3,
      retryIf: (error, operation) => {
        if (operation.operationName !== 'GetCategories') return false;
        if (ServerError.is(error) && [401, 403].includes(error.statusCode)) return false;
        return true;
      },
    },
  });
  return new ApolloClient({
    link: ApolloLink.from([errorLink, retryLink, httpLink]),
    cache: new InMemoryCache(),
  });
}

export const apolloClient = createApolloClient();
