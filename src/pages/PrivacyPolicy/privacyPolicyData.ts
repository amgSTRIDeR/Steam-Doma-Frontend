export type PrivacySectionId = 'controller' | 'processing' | 'hosting' | 'storage' | 'rights';

export interface PrivacySectionConfig {
  id: PrivacySectionId;
  hasEmail?: boolean;
}

export const PRIVACY_SECTIONS: PrivacySectionConfig[] = [
  { id: 'controller', hasEmail: true },
  { id: 'processing' },
  { id: 'hosting' },
  { id: 'storage' },
  { id: 'rights' },
];
