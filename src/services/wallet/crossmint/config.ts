export const CROSSMINT_CONFIG = {
  API_URL: 'https://staging.crossmint.com/api/v1-alpha2',
  ENDPOINTS: {
    WALLETS: '/wallets',
    TRANSACTIONS: '/transactions'
  },
  ERROR_MESSAGES: {
    INVALID_EMAIL: 'Please provide a valid email address',
    API_KEY_MISSING: 'Crossmint API key is not configured',
    WALLET_CREATION_FAILED: 'Failed to create custodial wallet',
    NETWORK_ERROR: 'Network error occurred while connecting to Crossmint'
  }
} as const;