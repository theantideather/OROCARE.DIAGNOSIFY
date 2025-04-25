import { ChartAnalysis } from '../../types';
import { MOCK_PATTERNS, MOCK_SUPPORT_LEVELS, MOCK_RESISTANCE_LEVELS } from './mockData';
import { getRandomElements, getRandomNumber } from './utils';

export class MockAnalysisService {
  async analyzeChart(): Promise<ChartAnalysis> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Randomly select trend
    const trends = ['bullish', 'bearish', 'neutral'] as const;
    const trend = trends[Math.floor(Math.random() * trends.length)];

    // Get patterns based on trend
    const patterns = trend === 'neutral' 
      ? getRandomElements(MOCK_PATTERNS.neutral, 2)
      : [
          ...getRandomElements(MOCK_PATTERNS[trend], 1),
          ...getRandomElements(MOCK_PATTERNS.neutral, 1)
        ];

    return {
      trend,
      confidence: getRandomNumber(70, 95),
      supportLevels: getRandomElements(MOCK_SUPPORT_LEVELS, 3),
      resistanceLevels: getRandomElements(MOCK_RESISTANCE_LEVELS, 3),
      patterns,
      marketSentiment: {
        fearGreedIndex: getRandomNumber(0, 100),
        sentiment: trend === 'bullish' ? 'greed' : trend === 'bearish' ? 'fear' : 'neutral',
        dominantTrend: trend === 'bullish' ? 'Uptrend' : trend === 'bearish' ? 'Downtrend' : 'Sideways',
        volumeAnalysis: 'Above average volume with increasing buying pressure'
      },
      tradeSetups: [
        {
          pattern: patterns[0],
          direction: trend === 'bullish' ? 'long' : 'short',
          entry: '$45,500',
          stopLoss: '$44,800',
          target: '$47,200',
          probability: getRandomNumber(65, 90)
        },
        {
          pattern: patterns[1],
          direction: trend === 'bullish' ? 'long' : 'short',
          entry: '$46,200',
          stopLoss: '$45,500',
          target: '$48,000',
          probability: getRandomNumber(65, 90)
        }
      ]
    };
  }
}