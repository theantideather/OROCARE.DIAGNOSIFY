export const CHART_PATTERNS = {
  bullish: {
    'Bull Flag': {
      description: 'A continuation pattern showing a downward sloping channel after a strong upward move.',
      characteristics: [
        'Strong upward move (flag pole)',
        'Parallel downward channel (flag)',
        'Lower volume during consolidation',
        'Breakout occurs with increased volume'
      ]
    },
    'Cup and Handle': {
      description: 'A bullish continuation pattern resembling a cup with a handle.',
      characteristics: [
        'U-shaped price action (cup)',
        'Slight downward drift (handle)',
        'Volume decreases in cup, increases on breakout',
        'Depth of cup typically 10-15%'
      ]
    }
    // Add more patterns...
  },
  bearish: {
    'Head and Shoulders': {
      description: 'A reversal pattern with three peaks, the middle being highest.',
      characteristics: [
        'Left shoulder, head, right shoulder formation',
        'Neckline support',
        'Volume typically highest at left shoulder',
        'Decreasing volume at head and right shoulder'
      ]
    }
    // Add more patterns...
  }
};

export const ANALYSIS_PROMPT = `Analyze this trading chart image and provide a detailed technical analysis. Structure your response exactly as follows:

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

For patterns, look specifically for:
- Trend continuation patterns
- Reversal patterns
- Price action patterns
- Volume patterns

When analyzing support/resistance:
- Look for multiple touches
- Consider previous highs/lows
- Note the strength of each level
- Identify key price zones

For trade setups:
- Define clear entry points
- Set logical stop losses
- Identify profit targets
- Assess probability based on pattern strength`;