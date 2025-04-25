import React, { useState } from 'react';
import { TradeForm } from './TradeForm';
import { TradeStatus } from './TradeStatus';
import { TradeExecutor } from '../../services/trading/tradeExecutor';
import { TOKENS } from '../../services/trading/constants';
import type { ChartAnalysis } from '../../types';
import type { TradeResult } from '../../services/trading/types';

interface TradePanelProps {
  analysis: ChartAnalysis;
  onTradeComplete?: (result: TradeResult) => void;
}

export function TradePanel({ analysis, onTradeComplete }: TradePanelProps) {
  const [status, setStatus] = useState<'idle' | 'executing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string>();
  const [txId, setTxId] = useState<string>();

  const handleTrade = async (amount: number) => {
    if (!window.phantom?.solana?.isConnected) {
      setError('Please connect your wallet first');
      setStatus('error');
      return;
    }

    setStatus('executing');
    setError(undefined);
    setTxId(undefined);

    try {
      // Convert amount to lamports (SOL's smallest unit)
      const lamports = amount * 1e9; // 1 SOL = 1e9 lamports

      console.log('Executing trade with amount:', amount, 'SOL (', lamports, 'lamports)');
      
      const result = await TradeExecutor.executeTrade(
        analysis,
        lamports,
        TOKENS.SOL.mint,
        TOKENS.USDC.mint
      );

      console.log('Trade result:', result);

      if (result.success) {
        setStatus('success');
        setTxId(result.txId);
      } else {
        throw new Error(result.error);
      }

      onTradeComplete?.(result);
    } catch (err: any) {
      console.error('Trade panel error:', err);
      setStatus('error');
      setError(err.message);
      onTradeComplete?.({ success: false, error: err.message });
    }
  };

  return (
    <div className="space-y-4">
      <TradeForm 
        onSubmit={handleTrade}
        disabled={status === 'executing'}
      />
      <TradeStatus 
        status={status}
        error={error}
        txId={txId}
      />
    </div>
  );
}