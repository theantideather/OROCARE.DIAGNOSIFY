import React, { useState } from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { JupiterService } from '../../services/trading/jupiterService';
import { TOKENS, TRADE_CONFIG } from '../../services/trading/constants';
import type { ChartAnalysis } from '../../types';
import type { Token } from '../../services/trading/types';

interface TradeExecutionPanelProps {
  analysis: ChartAnalysis;
  onTradeComplete?: (success: boolean) => void;
}

export function TradeExecutionPanel({ analysis, onTradeComplete }: TradeExecutionPanelProps) {
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
      // Validate trade size
      const tradeAmount = parseFloat(amount);
      if (tradeAmount < TRADE_CONFIG.MIN_TRADE_SIZE_USD) {
        throw new Error(`Minimum trade size is $${TRADE_CONFIG.MIN_TRADE_SIZE_USD}`);
      }
      if (tradeAmount > TRADE_CONFIG.MAX_TRADE_SIZE_USD) {
        throw new Error(`Maximum trade size is $${TRADE_CONFIG.MAX_TRADE_SIZE_USD}`);
      }

      // Execute trade based on analysis trend
      const result = await JupiterService.executeTrade({
        inputMint: TOKENS.SOL.mint,
        outputMint: TOKENS.USDC.mint,
        amount: tradeAmount,
        slippageBps: TRADE_CONFIG.DEFAULT_SLIPPAGE_BPS
      });

      setSuccess(true);
      onTradeComplete?.(true);
    } catch (err: any) {
      setError(err.message);
      onTradeComplete?.(false);
    } finally {
      setExecuting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Trade Amount (SOL)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border-2 border-black rounded-lg"
          placeholder="Enter amount..."
          min={TRADE_CONFIG.MIN_TRADE_SIZE_USD}
          max={TRADE_CONFIG.MAX_TRADE_SIZE_USD}
        />
      </div>

      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border-2 border-red-200 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border-2 border-green-200 rounded-lg">
          <p className="text-sm text-green-700">Trade executed successfully!</p>
        </div>
      )}

      <button
        onClick={handleTrade}
        disabled={!amount || executing || !window.phantom?.solana?.isConnected}
        className="w-full bg-red-600 text-white px-4 py-2 rounded-lg
                 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                 active:translate-x-1 active:translate-y-1
                 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                 transition-all flex items-center justify-center gap-2
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {executing ? (
          'Executing Trade...'
        ) : (
          <>
            Execute Trade
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}