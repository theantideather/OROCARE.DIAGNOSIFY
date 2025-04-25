import React from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, ArrowRight, Activity } from 'lucide-react';
import { ChartAnalysis } from '../../types';
import { TRADING_DISCLAIMER } from '../../utils/constants';

interface ChartAnalysisResultProps {
  analysis: ChartAnalysis;
}

export function ChartAnalysisResult({ analysis }: ChartAnalysisResultProps) {
  const getTrendColor = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'bullish': return 'text-green-600';
      case 'bearish': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'bullish': return <TrendingUp className="w-6 h-6 text-green-600" />;
      case 'bearish': return <TrendingDown className="w-6 h-6 text-red-600" />;
      default: return <Activity className="w-6 h-6 text-yellow-600" />;
    }
  };

  return (
    <div className="border-2 border-black rounded-lg p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          {getTrendIcon(analysis.trend)}
          <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
        </div>
        
        <div className="p-4 rounded-lg border-2 border-black mb-4 bg-gray-50">
          <h3 className="font-bold mb-2 text-gray-900">Market Direction:</h3>
          <p className={`text-lg font-bold ${getTrendColor(analysis.trend)}`}>
            {analysis.trend.toUpperCase()}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-lg border-2 border-black bg-gray-50">
            <h3 className="font-bold mb-2 text-gray-900">Support Levels:</h3>
            <ul className="space-y-2">
              {analysis.supportLevels.map((level, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <ArrowRight className="w-4 h-4 text-green-600" />
                  {level}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-lg border-2 border-black bg-gray-50">
            <h3 className="font-bold mb-2 text-gray-900">Resistance Levels:</h3>
            <ul className="space-y-2">
              {analysis.resistanceLevels.map((level, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <ArrowRight className="w-4 h-4 text-red-600" />
                  {level}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-lg border-2 border-black mb-6 bg-gray-50">
          <h3 className="font-bold mb-2 text-gray-900">Key Patterns:</h3>
          <ul className="space-y-2">
            {analysis.patterns.map((pattern, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <Activity className="w-4 h-4 text-red-600" />
                {pattern}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-lg border-2 border-black bg-gray-50">
          <h3 className="font-bold mb-2 text-gray-900">Analysis Confidence:</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5 border border-black">
            <div 
              className="bg-red-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${analysis.confidence}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{analysis.confidence}% confidence</p>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 bg-yellow-50 border-2 border-black rounded-lg">
        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-700">{TRADING_DISCLAIMER}</p>
      </div>
    </div>
  );
}