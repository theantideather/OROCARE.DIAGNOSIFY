import { useState } from 'react';
import { JupiterService } from '../services/trading/jupiterService';
import { JupiterFallback } from '../services/trading/jupiter/jupiterFallback';
import type { Token } from '../services/trading/types';

export function useJupiterTrade() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeTrade = async (
    inputToken: Token,
    outputToken: Token,
    amount: number
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await JupiterService.executeTrade({
        inputMint: inputToken.mint,
        outputMint: outputToken.mint,
        amount,
        slippageBps: 50
      });

      if (!result.success) {
        throw new Error(result.error || 'Trade failed');
      }

      return result;
    } catch (err: any) {
      setError(err.message);
      // Fallback to Jupiter UI
      JupiterFallback.redirectToJupiter(inputToken, outputToken);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    executeTrade,
    loading,
    error
  };
}