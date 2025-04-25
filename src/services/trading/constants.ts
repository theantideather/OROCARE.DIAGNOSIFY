export const JUPITER_ENDPOINTS = {
  QUOTE: 'https://quote-api.jup.ag/v6/quote',
  SWAP: 'https://quote-api.jup.ag/v6/swap'
} as const;

export const TOKENS = {
  SOL: {
    mint: 'So11111111111111111111111111111111111111112',
    symbol: 'SOL',
    name: 'Solana',
    decimals: 9,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
  },
  USDC: {
    mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
  }
} as const;

export const TRADE_CONFIG = {
  DEFAULT_SLIPPAGE_BPS: 50, // 0.5%
  MIN_TRADE_SIZE_USD: 1,
  MAX_TRADE_SIZE_USD: 10000,
  DEFAULT_COMPUTE_UNITS: 50000
} as const;