export function extractMarketSentiment(content: string) {
  const fearGreedMatch = content.match(/fearGreedIndex["\s:]+(\d+)/i);
  const sentimentMatch = content.match(/sentiment["\s:]+(["\s]*(fear|greed|neutral)["\s]*)/i);
  const trendMatch = content.match(/dominantTrend["\s:]+(["\s]*[^"\n,}]+["\s]*)/i);
  const volumeMatch = content.match(/volumeAnalysis["\s:]+(["\s]*[^"\n,}]+["\s]*)/i);

  return {
    fearGreedIndex: parseInt(fearGreedMatch?.[1] || '50', 10),
    sentiment: (sentimentMatch?.[2]?.toLowerCase() || 'neutral') as 'fear' | 'greed' | 'neutral',
    dominantTrend: trendMatch?.[1]?.replace(/['"]/g, '').trim() || 'Sideways',
    volumeAnalysis: volumeMatch?.[1]?.replace(/['"]/g, '').trim() || 'Average volume'
  };
}