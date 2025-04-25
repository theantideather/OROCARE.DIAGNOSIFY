import { JUPITER_ENDPOINTS } from '../constants';
import { HeliusConnection } from '../connection/heliusConnection';

export class JupiterSwapService {
  static async createSwapTransaction(quote: any, userPublicKey: string): Promise<string> {
    const response = await fetch(JUPITER_ENDPOINTS.SWAP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quoteResponse: quote,
        userPublicKey,
        wrapUnwrapSOL: true,
        priorityFee: await HeliusConnection.getPriorityFee()
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create swap transaction');
    }

    const { swapTransaction } = await response.json();
    return swapTransaction;
  }
}