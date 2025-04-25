export function extractTrend(content: string): 'bullish' | 'bearish' | 'neutral' {
  const trendMatch = content.match(/trend["\s:]+(["\s]*(bullish|bearish|neutral)["\s]*)/i);
  return (trendMatch?.[2]?.toLowerCase() || 'neutral') as 'bullish' | 'bearish' | 'neutral';
}