import React, { useState } from 'react';
import { Switch } from 'lucide-react';
import { EnhancedTradingPanel } from './EnhancedTradingPanel';
import type { ChartAnalysis } from '../../types';

interface AutoTradingPanelProps {
  analysis: ChartAnalysis;
}

export function AutoTradingPanel({ analysis }: AutoTradingPanelProps) {
  const [autoTrading, setAutoTrading] = useState(false);

  return (
    <div className="border-2 border-black rounded-lg p-4 bg-gray-50 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Auto Trading</h3>
        <button
          onClick={() => setAutoTrading(!autoTrading)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 border-black
                     transition-colors focus:outline-none
                     ${autoTrading ? 'bg-red-600' : 'bg-gray-200'}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white border-2 border-black
                       transition-transform ${autoTrading ? 'translate-x-5' : 'translate-x-1'}`}
          />
        </button>
      </div>

      <EnhancedTradingPanel />
    </div>
  );
}