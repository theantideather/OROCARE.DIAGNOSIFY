export const CHART_ANALYSIS_PROMPT = `Analyze this trading chart and provide only the following key information in this exact format:

TREND: [bullish/bearish/neutral]
CONFIDENCE: [0-100]

SUPPORT_LEVELS:
[List only key price levels]

RESISTANCE_LEVELS:
[List only key price levels]

PATTERNS:
[List only confirmed patterns]

FEAR_GREED_INDEX: [0-100]
MARKET_SENTIMENT: [fear/greed/neutral]
VOLUME_ANALYSIS: [Brief volume insight]

TRADE_SETUPS:
- Pattern: [pattern name]
  Direction: [long/short]
  Entry: [exact price]
  Stop Loss: [exact price]
  Target: [exact price]
  Probability: [0-100]

Keep responses concise and focused on these metrics only. No explanations or additional commentary needed.`;