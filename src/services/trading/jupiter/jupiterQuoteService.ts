import { JUPITER_ENDPOINTS } from '../constants';
import type { JupiterQuote } from '../types';

export class JupiterQuoteService {
  static async getQuote(params: JupiterQuote): Promise<any> {
    const searchParams = new URLSearchParams({
      inputMint: params.inputMint,
      outputMint: params.outputMint,
      amount: params.amount.toString(),
      slippageBps: params.slippageBps?.toString() || '50'
    });

    const response = await fetch(`${JUPITER_ENDPOINTS.QUOTE}?${searchParams}`);
    
    if (!response.ok) {
      throw new Error('Failed to get Jupiter quote');
    }
    
    return await response.json();
  }
}