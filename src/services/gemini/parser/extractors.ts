export function extractTrend(content: string): 'bullish' | 'bearish' | 'neutral' {
  const trend = content.match(/TREND:\s*(bullish|bearish|neutral)/i)?.[1] || 'neutral';
  return trend.toLowerCase() as 'bullish' | 'bearish' | 'neutral';
}

export function extractConfidence(content: string): number {
  return parseInt(content.match(/CONFIDENCE:\s*(\d+)/i)?.[1] || '85', 10);
}

export function extractLevels(content: string, type: string): string[] {
  const match = content.match(new RegExp(`${type}:\\s*([\\s\\S]*?)(?=\\n[A-Z]|$)`, 'i'));
  return match ? match[1].split('\n').filter(Boolean).map(level => level.trim()) : [];
}

export function extractPatterns(content: string): string[] {
  const match = content.match(/PATTERNS:\s*([\s\S]*?)(?=\n[A-Z]|$)/i);
  return match ? match[1].split('\n').filter(Boolean).map(pattern => pattern.trim()) : [];
}

export function extractMarketSentiment(content: string) {
  const fearGreedMatch = content.match(/FEAR_GREED_INDEX:\s*(\d+)/i);
  const fearGreedIndex = fearGreedMatch ? parseInt(fearGreedMatch[1], 10) : 50;

  const sentiment = content.match(/MARKET_SENTIMENT:\s*(fear|greed|neutral)/i)?.[1] || 'neutral';
  const dominantTrend = content.match(/DOMINANT_TREND:\s*([^\n]+)/i)?.[1] || 'Sideways';
  const volumeAnalysis = content.match(/VOLUME_ANALYSIS:\s*([^\n]+)/i)?.[1] || 'Average volume';

  return {
    fearGreedIndex,
    sentiment: sentiment as 'fear' | 'greed' | 'neutral',
    dominantTrend,
    volumeAnalysis
  };
}

export function extractTradeSetups(content: string) {
  const setupsMatch = content.match(/TRADE_SETUPS:\s*([\s\S]*?)(?=\n[A-Z]|$)/i);
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