import React from 'react';
import { ArrowRight, Loader } from 'lucide-react';
import { useJupiterTrade } from '../../hooks/useJupiterTrade';
import type { Token } from '../../services/trading/types';

interface TradeButtonProps {
  inputToken: Token;
  outputToken: Token;
  amount: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function TradeButton({
  inputToken,
  outputToken,
  amount,
  onSuccess,
  onError
}: TradeButtonProps) {
  const { executeTrade, loading, error } = useJupiterTrade();

  const handleClick = async () => {
    const result = await executeTrade(inputToken, outputToken, amount);
    if (result.success) {
      onSuccess?.();
    } else {
      onError?.(result.error || 'Trade failed');
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading || !amount}
        className="w-full bg-red-600 text-white px-4 py-2 rounded-lg
                 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                 active:translate-x-1 active:translate-y-1
                 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                 transition-all flex items-center justify-center gap-2
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            Execute Trade
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      {error && (
        <p className="text-sm text-red-600 mt-2">
          {error}
        </p>
      )}
    </>
  );
}