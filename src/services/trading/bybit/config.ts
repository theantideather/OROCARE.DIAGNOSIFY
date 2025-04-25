export const BYBIT_CONFIG = {
  MAINNET_URL: 'https://api.bybit.com',
  TESTNET_URL: 'https://api-testnet.bybit.com',
  ENDPOINTS: {
    PLACE_ORDER: '/v5/order/create',
    GET_BALANCE: '/v5/account/wallet-balance',
  },
  DEFAULT_OPTIONS: {
    timeInForce: 'GTC',
    orderType: 'Market'
  }
} as const;