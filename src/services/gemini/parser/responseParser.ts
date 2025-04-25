import { ChartAnalysis } from '../../../types';
import { extractTrend } from './extractors/trendExtractor';
import { extractMarketSentiment } from './extractors/marketSentimentExtractor';
import { extractTradeSetups } from './extractors/tradeSetupExtractor';
import { GeminiClientError } from '../error/GeminiClientError';

export class GeminiResponseParser {
  parse(content: string): ChartAnalysis {
    try {
      // Try parsing as JSON first
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonResponse = JSON.parse(jsonMatch[0]);
          if (this.isValidAnalysis(jsonResponse)) {
            return this.normalizeAnalysis(jsonResponse);
          }
        }
      } catch (e) {
        console.warn('JSON parsing failed, falling back to text parsing');
      }

      // Fallback to text parsing
      return {
        trend: extractTrend(content),
        confidence: this.extractConfidence(content),
        supportLevels: this.extractLevels(content, 'SUPPORT_LEVELS'),
        resistanceLevels: this.extractLevels(content, 'RESISTANCE_LEVELS'),
        patterns: this.extractPatterns(content),
        marketSentiment: extractMarketSentiment(content),
        tradeSetups: extractTradeSetups(content)
      };
    } catch (error) {
      console.error('Response parsing error:', error);
      throw new GeminiClientError('Failed to parse analysis response');
    }
  }

  private extractConfidence(content: string): number {
    const match = content.match(/confidence["\s:]+(\d+)/i);
    return Math.min(parseInt(match?.[1] || '85', 10), 100);
  }

  private extractLevels(content: string, type: string): string[] {
    const match = content.match(new RegExp(`${type}["\s:]+\\[([\s\S]*?)\\]`, 'i'));
    if (!match) return [];
    
    return match[1]
      .split(',')
      .map(level => level.replace(/["\s]/g, ''))
      .filter(Boolean);
  }

  private extractPatterns(content: string): string[] {
    const match = content.match(/patterns["\s:]+\[([\s\S]*?)\]/i);
    if (!match) return [];

    return match[1]
      .split(',')
      .map(pattern => pattern.replace(/["\s]/g, ''))
      .filter(Boolean);
  }

  private isValidAnalysis(json: any): boolean {
    return (
      json.trend &&
      typeof json.confidence === 'number' &&
      Array.isArray(json.supportLevels) &&
      Array.isArray(json.resistanceLevels) &&
      Array.isArray(json.patterns) &&
      json.marketSentiment &&
      Array.isArray(json.tradeSetups)
    );
  }

  private normalizeAnalysis(json: any): ChartAnalysis {
    return {
      trend: json.trend.toLowerCase(),
      confidence: Math.min(json.confidence, 100),
      supportLevels: json.supportLevels.map(String),
      resistanceLevels: json.resistanceLevels.map(String),
      patterns: json.patterns.map(String),
      marketSentiment: {
        fearGreedIndex: Math.min(json.marketSentiment.fearGreedIndex, 100),
        sentiment: json.marketSentiment.sentiment.toLowerCase(),
        dominantTrend: String(json.marketSentiment.dominantTrend),
        volumeAnalysis: String(json.marketSentiment.volumeAnalysis)
      },
      tradeSetups: json.tradeSetups.map(setup => ({
        pattern: String(setup.pattern),
        direction: setup.direction.toLowerCase(),
        entry: String(setup.entry),
        stopLoss: String(setup.stopLoss),
        target: String(setup.target),
        probability: Math.min(setup.probability, 100)
      }))
    };
  }
}