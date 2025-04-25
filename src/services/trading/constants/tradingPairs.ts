import { POPULAR_TOKENS } from './popular';
import type { TradingPair } from '../types';

// Define common stablecoin pairs
export const STABLECOIN_PAIRS: TradingPair[] = [
  { input: POPULAR_TOKENS.SOL, output: POPULAR_TOKENS.USDC },
  { input: POPULAR_TOKENS.BONK, output: POPULAR_TOKENS.USDC },
  { input: POPULAR_TOKENS.ORCA, output: POPULAR_TOKENS.USDC },
  { input: POPULAR_TOKENS.RAY, output: POPULAR_TOKENS.USDC },
  { input: POPULAR_TOKENS.SAMO, output: POPULAR_TOKENS.USDC },
  { input: POPULAR_TOKENS.DUST, output: POPULAR_TOKENS.USDC },
];

// Define SOL trading pairs
export const SOL_PAIRS: TradingPair[] = [
  { input: POPULAR_TOKENS.BONK, output: POPULAR_TOKENS.SOL },
  { input: POPULAR_TOKENS.ORCA, output: POPULAR_TOKENS.SOL },
  { input: POPULAR_TOKENS.RAY, output: POPULAR_TOKENS.SOL },
  { input: POPULAR_TOKENS.SAMO, output: POPULAR_TOKENS.SOL },
  { input: POPULAR_TOKENS.DUST, output: POPULAR_TOKENS.SOL },
];

// Define meme token pairs
export const MEME_PAIRS: TradingPair[] = [
  { input: POPULAR_TOKENS.BONK, output: POPULAR_TOKENS.SAMO },
  { input: POPULAR_TOKENS.BONK, output: POPULAR_TOKENS.DUST },
  { input: POPULAR_TOKENS.SAMO, output: POPULAR_TOKENS.DUST },
];