import { gql } from '@apollo/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  ACCESS_DENIED_EVENT,
  AUTHENTICATED_CONTEXT,
  AUTH_REQUIRED_EVENT,
  createApolloClient,
} from './apollo';
import { GRAPHQL_URL } from './api';

const TEST_QUERY = gql`
  query TestQuery {
    __typename
  }
`;

const CATALOG_FILTERS_QUERY = gql`
  query GetCategories {
    catalogFilters {
      genres {
        id
        name
      }
      categories {
        id
        name
      }
      platforms {
        id
        name
      }
    }
  }
`;

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Apollo Client', () => {
  it('sends public operations without cookies', async () => {
    const fetchImplementation = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: { __typename: 'Query' } }), {
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    const client = createApolloClient(fetchImplementation);

    await client.query({ query: TEST_QUERY, fetchPolicy: 'network-only' });

    expect(fetchImplementation).toHaveBeenCalledWith(
      GRAPHQL_URL,
      expect.objectContaining({ credentials: 'omit' }),
    );
    client.stop();
  });

  it('sends authenticated operations with cookies', async () => {
    const fetchImplementation = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: { __typename: 'Query' } }), {
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    const client = createApolloClient(fetchImplementation);

    await client.query({
      query: TEST_QUERY,
      context: AUTHENTICATED_CONTEXT,
      fetchPolicy: 'network-only',
    });

    expect(fetchImplementation).toHaveBeenCalledWith(
      GRAPHQL_URL,
      expect.objectContaining({ credentials: 'include' }),
    );
    client.stop();
  });

  it('retries catalog filter network requests twice before succeeding', async () => {
    const fetchImplementation = vi
      .fn()
      .mockRejectedValueOnce(new TypeError('Network unavailable'))
      .mockRejectedValueOnce(new TypeError('Network unavailable'))
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            data: { catalogFilters: { genres: [], categories: [], platforms: [] } },
          }),
          { headers: { 'Content-Type': 'application/json' } },
        ),
      );
    const client = createApolloClient(fetchImplementation);

    await client.query({ query: CATALOG_FILTERS_QUERY, fetchPolicy: 'network-only' });

    expect(fetchImplementation).toHaveBeenCalledTimes(3);
    client.stop();
  });

  it('surfaces the Apollo error after two catalog filter retries fail', async () => {
    const fetchImplementation = vi.fn().mockRejectedValue(new TypeError('Network unavailable'));
    const client = createApolloClient(fetchImplementation);
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(
      client.query({ query: CATALOG_FILTERS_QUERY, fetchPolicy: 'network-only' }),
    ).rejects.toBeTruthy();

    expect(fetchImplementation).toHaveBeenCalledTimes(3);
    expect(consoleError).toHaveBeenCalledOnce();
    expect(consoleError).toHaveBeenCalledWith(
      '[Apollo] GraphQL request failed:',
      expect.anything(),
    );
    client.stop();
  });

  it('dispatches an auth-required event for HTTP 401 responses', async () => {
    const fetchImplementation = vi
      .fn()
      .mockResolvedValue(new Response('Unauthorized', { status: 401 }));
    const client = createApolloClient(fetchImplementation);
    const authRequired = vi.fn();
    window.addEventListener(AUTH_REQUIRED_EVENT, authRequired);

    await expect(
      client.query({
        query: TEST_QUERY,
        context: AUTHENTICATED_CONTEXT,
        fetchPolicy: 'network-only',
      }),
    ).rejects.toBeTruthy();

    expect(authRequired).toHaveBeenCalledOnce();
    window.removeEventListener(AUTH_REQUIRED_EVENT, authRequired);
    client.stop();
  });

  it('dispatches an access-denied event for HTTP 403 responses', async () => {
    const fetchImplementation = vi
      .fn()
      .mockResolvedValue(new Response('Forbidden', { status: 403 }));
    const client = createApolloClient(fetchImplementation);
    const accessDenied = vi.fn();
    window.addEventListener(ACCESS_DENIED_EVENT, accessDenied);

    await expect(
      client.query({
        query: TEST_QUERY,
        context: AUTHENTICATED_CONTEXT,
        fetchPolicy: 'network-only',
      }),
    ).rejects.toBeTruthy();

    expect(accessDenied).toHaveBeenCalledOnce();
    window.removeEventListener(ACCESS_DENIED_EVENT, accessDenied);
    client.stop();
  });
});
