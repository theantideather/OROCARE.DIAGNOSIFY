import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { TRADE_CONFIG } from '../../services/trading/constants';

interface TradeFormProps {
  onSubmit: (amount: number) => void;
  disabled?: boolean;
}

export function TradeForm({ onSubmit, disabled }: TradeFormProps) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    onSubmit(parseFloat(amount));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          disabled={disabled}
        />
      </div>

      <button
        type="submit"
        disabled={!amount || disabled}
        className="w-full bg-red-600 text-white px-4 py-2 rounded-lg
                 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                 active:translate-x-1 active:translate-y-1
                 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                 transition-all flex items-center justify-center gap-2
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Execute Trade
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}