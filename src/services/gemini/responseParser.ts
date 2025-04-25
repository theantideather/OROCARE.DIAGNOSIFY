import { ChartAnalysis } from '../../types';

export class GeminiResponseParser {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  parse(): ChartAnalysis {
    return {
      trend: this.extractTrend(),
      confidence: this.extractConfidence(),
      supportLevels: this.extractSupportLevels(),
      resistanceLevels: this.extractResistanceLevels(),
      patterns: this.extractPatterns(),
      marketSentiment: this.extractMarketSentiment(),
      tradeSetups: this.extractTradeSetups()
    };
  }

  private extractTrend(): 'bullish' | 'bearish' | 'neutral' {
    const trend = this.content.match(/TREND:\s*(bullish|bearish|neutral)/i)?.[1] || 'neutral';
    return trend.toLowerCase() as 'bullish' | 'bearish' | 'neutral';
  }

  private extractConfidence(): number {
    return parseInt(this.content.match(/CONFIDENCE:\s*(\d+)/i)?.[1] || '85', 10);
  }

  private extractSupportLevels(): string[] {
    const match = this.content.match(/SUPPORT_LEVELS:\s*([\s\S]*?)(?=\n[A-Z]|$)/i);
    return match ? match[1].split('\n').filter(Boolean).map(level => level.trim()) : [];
  }

  private extractResistanceLevels(): string[] {
    const match = this.content.match(/RESISTANCE_LEVELS:\s*([\s\S]*?)(?=\n[A-Z]|$)/i);
    return match ? match[1].split('\n').filter(Boolean).map(level => level.trim()) : [];
  }

  private extractPatterns(): string[] {
    const match = this.content.match(/PATTERNS:\s*([\s\S]*?)(?=\n[A-Z]|$)/i);
    return match ? match[1].split('\n').filter(Boolean).map(pattern => pattern.trim()) : [];
  }

  private extractMarketSentiment() {
    const fearGreedMatch = this.content.match(/FEAR_GREED_INDEX:\s*(\d+)/i);
    const fearGreedIndex = fearGreedMatch ? parseInt(fearGreedMatch[1], 10) : 50;

    const sentiment = this.content.match(/MARKET_SENTIMENT:\s*(fear|greed|neutral)/i)?.[1] || 'neutral';
    const dominantTrend = this.content.match(/DOMINANT_TREND:\s*([^\n]+)/i)?.[1] || 'Sideways';
    const volumeAnalysis = this.content.match(/VOLUME_ANALYSIS:\s*([^\n]+)/i)?.[1] || 'Average volume';

    return {
      fearGreedIndex,
      sentiment: sentiment as 'fear' | 'greed' | 'neutral',
      dominantTrend,
      volumeAnalysis
    };
  }

  private extractTradeSetups() {
    const setupsMatch = this.content.match(/TRADE_SETUPS:\s*([\s\S]*?)(?=\n[A-Z]|$)/i);
    if (!setupsMatch) return [];

    const setupsText = setupsMatch[1];
    const setups = setupsText.split('\n- ').filter(Boolean);

    return setups.map(setup => ({
      pattern: setup.match(/Pattern:\s*([^\n]+)/i)?.[1] || '',
      direction: (setup.match(/Direction:\s*(long|short)/i)?.[1] || 'long') as 'long' | 'short',
      entry: setup.match(/Entry:\s*([^\n]+)/i)?.[1] || '',
      stopLoss: setup.match(/Stop Loss:\s*([^\n]+)/i)?.[1] || '',
      target: setup.match(/Target:\s*([^\n]+)/i)?.[1] || '',
      probability: parseInt(setup.match(/Probability:\s*(\d+)/i)?.[1] || '70', 10)
    }));
  }
}