import React from 'react';
import { TokenSelect } from './TokenSelect';
import { ArrowRight } from 'lucide-react';
import type { Token } from '../../services/trading/types';

interface TradingPairSelectorProps {
  inputToken: Token;
  outputToken: Token;
  onInputTokenChange: (token: Token) => void;
  onOutputTokenChange: (token: Token) => void;
}

export function TradingPairSelector({
  inputToken,
  outputToken,
  onInputTokenChange,
  onOutputTokenChange
}: TradingPairSelectorProps) {
  return (
    <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center">
      <TokenSelect
        value={inputToken}
        onChange={onInputTokenChange}
        label="From"
      />
      
      <div className="flex items-center justify-center">
        <ArrowRight className="w-5 h-5 text-gray-400" />
      </div>
      
      <TokenSelect
        value={outputToken}
        onChange={onOutputTokenChange}
        label="To"
      />
    </div>
  );
}