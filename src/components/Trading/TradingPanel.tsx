import React, { useState } from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { TokenSelect } from './TokenSelect';
import { TOKENS } from '../../services/trading/constants';
import { JupiterService } from '../../services/trading/jupiterService';
import type { Token } from '../../services/trading/types';
import type { ChartAnalysis } from '../../types';

interface TradingPanelProps {
  analysis: ChartAnalysis;
}

export function TradingPanel({ analysis }: TradingPanelProps) {
  const [inputToken, setInputToken] = useState<Token>(TOKENS.SOL);
  const [outputToken, setOutputToken] = useState<Token>(TOKENS.USDC);
  const [amount, setAmount] = useState('');
  const [executing, setExecuting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleTrade = async () => {
    if (!amount || !window.phantom?.solana?.isConnected) return;
    
    setExecuting(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await JupiterService.executeTrade({
        inputMint: inputToken.mint,
        outputMint: outputToken.mint,
        amount: parseFloat(amount),
        slippageBps: 50 // 0.5% slippage
      });

      if (result.success) {
        setSuccess(true);
      } else {
        throw new Error(result.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setExecuting(false);
    }
  };

  return (
    <div className="space-y-4 p-3 sm:p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <TokenSelect
          value={inputToken}
          onChange={setInputToken}
          label="From Token"
        />
        <TokenSelect
          value={outputToken}
          onChange={setOutputToken}
          label="To Token"
        />
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount ({inputToken.symbol})
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border-2 border-black rounded-lg text-base"
          placeholder="Enter amount..."
          min={0}
        />
      </div>

      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border-2 border-red-200 rounded-lg">
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border-2 border-green-200 rounded-lg">
          <p className="text-xs sm:text-sm text-green-700">Trade executed successfully!</p>
        </div>
      )}

      <button
        onClick={handleTrade}
        disabled={!amount || executing}
        className="w-full bg-red-600 text-white px-4 py-3 rounded-lg
                 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                 active:translate-x-1 active:translate-y-1
                 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                 transition-all flex items-center justify-center gap-2
                 text-sm sm:text-base font-medium
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {executing ? (
          'Executing Trade...'
        ) : (
          <>
            Execute Trade
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </>
        )}
      </button>
    </div>
  );
}