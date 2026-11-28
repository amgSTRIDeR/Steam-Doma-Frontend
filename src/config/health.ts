import { gql, type TypedDocumentNode } from '@apollo/client';
import { apolloClient } from './apollo';

const HEALTH_QUERY: TypedDocumentNode<{ ping: string }> = gql`
  query BackendHealth {
    ping
  }
`;

export async function checkBackendHealth(client = apolloClient): Promise<void> {
  try {
    const { data } = await client.query({
      query: HEALTH_QUERY,
      fetchPolicy: 'network-only',
    });

    if (data?.ping !== 'pong') {
      console.error('[Backend] GraphQL health check returned an unexpected response');
      return;
    }

    console.info('[Backend] GraphQL health check succeeded');
  } catch (error) {
    console.error('[Backend] GraphQL health check failed:', error);
  }
}
