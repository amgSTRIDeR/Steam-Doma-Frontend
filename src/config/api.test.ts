import { afterEach, describe, expect, it, vi } from 'vitest';
import { checkBackendHealth, GRAPHQL_URL, HEALTH_URL } from './api';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('checkBackendHealth', () => {
  it('uses the GraphQL backend health endpoint by default', () => {
    const backendBaseUrl = GRAPHQL_URL.replace(/\/graphql\/?$/, '').replace(/\/$/, '');

    expect(HEALTH_URL).toBe(`${backendBaseUrl}/health`);
  });

  it('logs a successful health response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 200 })));
    const consoleInfo = vi.spyOn(console, 'info').mockImplementation(() => {});

    await checkBackendHealth();

    expect(fetch).toHaveBeenCalledWith(HEALTH_URL);
    expect(consoleInfo).toHaveBeenCalledWith('[Backend] Health check succeeded with HTTP 200');
  });

  it('logs an unsuccessful health response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 503 })));
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    await checkBackendHealth();

    expect(consoleError).toHaveBeenCalledWith('[Backend] Health check failed with HTTP 503');
  });

  it('logs network errors', async () => {
    const error = new TypeError('Network unavailable');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(error));
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    await checkBackendHealth();

    expect(consoleError).toHaveBeenCalledWith('[Backend] Health check request failed:', error);
  });
});
