import React from 'react';
import { STABLECOIN_PAIRS, SOL_PAIRS, MEME_PAIRS } from '../../services/trading/constants/tradingPairs';
import type { Token } from '../../services/trading/types';

interface QuickTradePairsProps {
  onSelectPair: (inputToken: Token, outputToken: Token) => void;
}

export function QuickTradePairs({ onSelectPair }: QuickTradePairsProps) {
  return (
    <div className="space-y-4">
      {/* Stablecoin Pairs */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Popular USDC Pairs</h3>
        <div className="grid grid-cols-2 gap-2">
          {STABLECOIN_PAIRS.map((pair, index) => (
            <TradePairButton key={`stable-${index}`} pair={pair} onClick={() => onSelectPair(pair.input, pair.output)} />
          ))}
        </div>
      </div>

      {/* SOL Pairs */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">SOL Trading Pairs</h3>
        <div className="grid grid-cols-2 gap-2">
          {SOL_PAIRS.map((pair, index) => (
            <TradePairButton key={`sol-${index}`} pair={pair} onClick={() => onSelectPair(pair.input, pair.output)} />
          ))}
        </div>
      </div>

      {/* Meme Token Pairs */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Meme Token Pairs</h3>
        <div className="grid grid-cols-2 gap-2">
          {MEME_PAIRS.map((pair, index) => (
            <TradePairButton key={`meme-${index}`} pair={pair} onClick={() => onSelectPair(pair.input, pair.output)} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface TradePairButtonProps {
  pair: { input: Token; output: Token };
  onClick: () => void;
}

function TradePairButton({ pair, onClick }: TradePairButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 p-2 bg-white border-2 border-black rounded-lg
                hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                transition-all text-sm"
    >
      <div className="flex items-center gap-1">
        <img 
          src={pair.input.logoURI} 
          alt={pair.input.symbol}
          className="w-4 h-4 rounded-full"
        />
        <span>{pair.input.symbol}</span>
      </div>
      <span className="text-gray-400">/</span>
      <div className="flex items-center gap-1">
        <img 
          src={pair.output.logoURI} 
          alt={pair.output.symbol}
          className="w-4 h-4 rounded-full"
        />
        <span>{pair.output.symbol}</span>
      </div>
    </button>
  );
}