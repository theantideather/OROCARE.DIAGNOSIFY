import React from 'react';
import { Brain, Activity, BarChart3, Gauge } from 'lucide-react';
import type { ChartAnalysis } from '../../types';

interface AnalysisExplanationPanelProps {
  analysis: ChartAnalysis;
}

export function AnalysisExplanationPanel({ analysis }: AnalysisExplanationPanelProps) {
  const renderConfidenceBar = (value: number) => (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
      <div 
        className="bg-red-600 h-2 rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );

  return (
    <div className="border-2 border-black rounded-lg p-4 bg-gray-50 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-6 h-6 text-red-600" />
        <h3 className="font-bold text-gray-900">PreBulls AI Magic 🚀</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Market Trends & Sentiment */}
        <div className="p-4 border-2 border-black rounded-lg bg-white">
          <div className="flex items-center gap-2 mb-3">
            <Gauge className="w-5 h-5 text-green-600" />
            <h4 className="font-bold text-gray-800">Market Vibes</h4>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Fear & Greed Index</p>
              {renderConfidenceBar(analysis.marketSentiment.fearGreedIndex)}
              <div className="text-xs text-gray-500">
                {analysis.marketSentiment.fearGreedIndex}% - {analysis.marketSentiment.sentiment}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Market Trend</p>
              {renderConfidenceBar(analysis.confidence)}
              <div className="text-xs text-gray-500">
                {analysis.trend.toUpperCase()} - {analysis.marketSentiment.dominantTrend}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Volume Analysis</p>
              {renderConfidenceBar(80)}
              <div className="text-xs text-gray-500">{analysis.marketSentiment.volumeAnalysis}</div>
            </div>
          </div>
        </div>

        {/* Price Action & Patterns */}
        <div className="p-4 border-2 border-black rounded-lg bg-white">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-blue-600" />
            <h4 className="font-bold text-gray-800">Price Action</h4>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Chart Patterns</p>
              {renderConfidenceBar(90)}
              <div className="text-xs text-gray-500">
                {analysis.patterns.join(', ')}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Support Levels</p>
              {renderConfidenceBar(85)}
              <div className="text-xs text-gray-500">
                {analysis.supportLevels.join(' | ')}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Resistance Levels</p>
              {renderConfidenceBar(85)}
              <div className="text-xs text-gray-500">
                {analysis.resistanceLevels.join(' | ')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trade Setups */}
      <div className="mt-4 p-4 border-2 border-black rounded-lg bg-white">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          <h4 className="font-bold text-gray-800">Trade Setups</h4>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {analysis.tradeSetups.map((setup, index) => (
            <div key={index} className="p-3 border-2 border-black rounded-lg bg-gray-50">
              <p className="font-medium text-gray-800 mb-2">{setup.pattern}</p>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">Entry: <span className="font-bold">{setup.entry}</span></p>
                <p className="text-red-600">Stop: <span className="font-bold">{setup.stopLoss}</span></p>
                <p className="text-green-600">Target: <span className="font-bold">{setup.target}</span></p>
                <div className="mt-2">
                  {renderConfidenceBar(setup.probability)}
                  <p className="text-xs text-gray-500">{setup.probability}% probability</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
        <p className="text-sm text-blue-700">
          PreBulls AI is scanning the markets 24/7, analyzing price action, patterns, and market sentiment
          to bring you the most profitable trading opportunities! 🎯
        </p>
      </div>
    </div>
  );
}