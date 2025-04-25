export interface Token {
  mint: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

export interface TradingPair {
  input: Token;
  output: Token;
}

export interface JupiterQuote {
  inputMint: string;
  outputMint: string;
  amount: number;
  slippageBps?: number;
}

export interface TradeResult {
  success: boolean;
  txId?: string;
  error?: string;
}