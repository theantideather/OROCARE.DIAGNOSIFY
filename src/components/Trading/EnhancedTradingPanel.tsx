import React, { useState } from 'react';
import { POPULAR_TOKENS } from '../../services/trading/constants/popular';
import { TradingPairSelector } from './TradingPairSelector';
import { QuickTradePairs } from './QuickTradePairs';
import { TradeButton } from './TradeButton';
import type { Token } from '../../services/trading/types';

export function EnhancedTradingPanel() {
  const [inputToken, setInputToken] = useState<Token>(POPULAR_TOKENS.SOL);
  const [outputToken, setOutputToken] = useState<Token>(POPULAR_TOKENS.USDC);
  const [amount, setAmount] = useState('');

  const handleSelectPair = (input: Token, output: Token) => {
    setInputToken(input);
    setOutputToken(output);
  };

  return (
    <div className="space-y-6 p-4">
      <QuickTradePairs onSelectPair={handleSelectPair} />
      
      <TradingPairSelector
        inputToken={inputToken}
        outputToken={outputToken}
        onInputTokenChange={setInputToken}
        onOutputTokenChange={setOutputToken}
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount ({inputToken.symbol})
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border-2 border-black rounded-lg"
          placeholder="Enter amount..."
          min={0}
        />
      </div>

      <TradeButton
        inputToken={inputToken}
        outputToken={outputToken}
        amount={parseFloat(amount)}
        onSuccess={() => {
          setAmount('');
        }}
      />
    </div>
  );
}