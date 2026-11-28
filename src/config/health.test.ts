import { afterEach, describe, expect, it, vi } from 'vitest';
import { GRAPHQL_URL } from './api';
import { createApolloClient } from './apollo';
import { checkBackendHealth } from './health';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('checkBackendHealth', () => {
  it('uses the Apollo GraphQL endpoint and ping query', async () => {
    const fetchImplementation = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: { ping: 'pong' } }), {
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    const client = createApolloClient(fetchImplementation);

    await checkBackendHealth(client);

    expect(fetchImplementation).toHaveBeenCalledWith(
      GRAPHQL_URL,
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('ping'),
      }),
    );
    expect(fetchImplementation).toHaveBeenCalledTimes(1);
    client.stop();
  });

  it('logs an unexpected ping response', async () => {
    const fetchImplementation = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: { ping: 'nope' } }), {
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    const client = createApolloClient(fetchImplementation);
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    await checkBackendHealth(client);

    expect(consoleError).toHaveBeenCalledWith(
      '[Backend] GraphQL health check returned an unexpected response',
    );
    client.stop();
  });

  it('logs GraphQL request errors', async () => {
    const error = new TypeError('Network unavailable');
    const fetchImplementation = vi.fn().mockRejectedValue(error);
    const client = createApolloClient(fetchImplementation);
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    await checkBackendHealth(client);

    expect(consoleError).toHaveBeenCalledWith('[Backend] GraphQL health check failed:', error);
    client.stop();
  });
});
