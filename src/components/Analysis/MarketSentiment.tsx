import React from 'react';
import { PieChart, Gauge, TrendingUp, TrendingDown } from 'lucide-react';

interface MarketSentimentProps {
  fearGreedIndex: number;
  marketSentiment: 'fear' | 'greed' | 'neutral';
  dominantTrend: string;
  volumeAnalysis: string;
}

export function MarketSentiment({ 
  fearGreedIndex, 
  marketSentiment,
  dominantTrend,
  volumeAnalysis 
}: MarketSentimentProps) {
  const getSentimentColor = () => {
    switch (marketSentiment) {
      case 'fear': return 'text-red-600';
      case 'greed': return 'text-green-600';
      default: return 'text-yellow-600';
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <div className="border-2 border-black rounded-lg p-4 bg-gray-50">
        <div className="flex items-center gap-2 mb-4">
          <Gauge className="w-6 h-6 text-red-600" />
          <h3 className="font-bold text-gray-900">Fear & Greed Index</h3>
        </div>
        
        <div className="relative w-48 h-48 mx-auto mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-900">{fearGreedIndex}</span>
          </div>
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="92"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="8"
            />
            <circle
              cx="96"
              cy="96"
              r="92"
              fill="none"
              stroke={marketSentiment === 'fear' ? '#DC2626' : '#059669'}
              strokeWidth="8"
              strokeDasharray={`${fearGreedIndex * 5.78} 578`}
            />
          </svg>
        </div>
        
        <p className={`text-center font-bold ${getSentimentColor()}`}>
          {marketSentiment.toUpperCase()}
        </p>
      </div>

      <div className="border-2 border-black rounded-lg p-4 bg-gray-50">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="w-6 h-6 text-red-600" />
          <h3 className="font-bold text-gray-900">Market Analysis</h3>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-1">Dominant Trend</h4>
            <div className="flex items-center gap-2">
              {dominantTrend.includes('up') ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
              <span className="font-bold text-gray-900">{dominantTrend}</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-1">Volume Analysis</h4>
            <p className="text-gray-900">{volumeAnalysis}</p>
          </div>
        </div>
      </div>
    </div>
  );
}