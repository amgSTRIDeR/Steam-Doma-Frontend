export const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL || '/graphql';

const backendBaseUrl = GRAPHQL_URL.replace(/\/graphql\/?$/, '').replace(/\/$/, '');

export const HEALTH_URL = `${backendBaseUrl}/health`;

export async function checkBackendHealth(): Promise<void> {
  try {
    const response = await fetch(HEALTH_URL);

    if (!response.ok) {
      console.error(`[Backend] Health check failed with HTTP ${response.status}`);
      return;
    }

    console.info(`[Backend] Health check succeeded with HTTP ${response.status}`);
  } catch (error) {
    console.error('[Backend] Health check request failed:', error);
  }
}
