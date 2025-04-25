import { PublicKey } from '@solana/web3.js';

export const PAYMENT_CONFIG = {
  MERCHANT_ADDRESS: '6zpzoRrchuCYP2Hb249JL52iArMkKfx79ti2vMCk5hME',
  FREE_ATTEMPTS: 3,
  PAID_ATTEMPTS: 5,
  PAYMENT_AMOUNT: 2, // 2 USDC
  USDC_MINT: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  STORAGE_KEY: 'analysis_attempts',
  PAYMENT_STORAGE_KEY: 'payment_status'
} as const;