import React from 'react';
import { Target, AlertTriangle, CheckCircle } from 'lucide-react';

interface TradeSetup {
  pattern: string;
  direction: 'long' | 'short';
  entry: string;
  stopLoss: string;
  target: string;
  probability: number;
}

interface TradeSetupsProps {
  setups: TradeSetup[];
}

export function TradeSetups({ setups }: TradeSetupsProps) {
  return (
    <div className="border-2 border-black rounded-lg p-4 bg-gray-50 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-6 h-6 text-red-600" />
        <h3 className="font-bold text-gray-900">Potential Trade Setups</h3>
      </div>

      <div className="space-y-4">
        {setups.map((setup, index) => (
          <div key={index} className="border-2 border-black rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-gray-900">{setup.pattern}</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-bold
                            ${setup.direction === 'long' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'}`}>
                {setup.direction.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Entry</p>
                <p className="font-bold text-gray-900">{setup.entry}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Stop Loss</p>
                <p className="font-bold text-red-600">{setup.stopLoss}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Target</p>
                <p className="font-bold text-green-600">{setup.target}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {setup.probability >= 70 ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              )}
              <span className="text-sm text-gray-600">
                {setup.probability}% Probability
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}