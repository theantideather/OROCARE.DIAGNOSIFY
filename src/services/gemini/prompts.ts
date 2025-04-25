export const CHART_ANALYSIS_PROMPT = `Analyze this trading chart and provide a detailed technical analysis. Structure your response exactly as follows:

TREND: [bullish/bearish/neutral]
CONFIDENCE: [0-100]

SUPPORT_LEVELS:
[List key support levels]

RESISTANCE_LEVELS:
[List key resistance levels]

PATTERNS:
[List identified chart patterns]

FEAR_GREED_INDEX: [0-100]
MARKET_SENTIMENT: [fear/greed/neutral]
DOMINANT_TREND: [Describe the dominant trend]
VOLUME_ANALYSIS: [Analyze volume patterns]

TRADE_SETUPS:
- Pattern: [pattern name]
  Direction: [long/short]
  Entry: [price level]
  Stop Loss: [price level]
  Target: [price level]
  Probability: [0-100]

Consider these key aspects:
1. Price action and trend direction
2. Support and resistance levels
3. Chart patterns (flags, triangles, etc.)
4. Volume analysis
5. Market structure
6. Potential trade setups

Remember to:
- Account for crypto market volatility
- Consider 24/7 trading effects
- Factor in market sentiment
- Provide precise entry/exit points
- Include risk management guidelines`;