export function extractTradeSetups(content: string) {
  try {
    // Try to parse as JSON first
    const jsonMatch = content.match(/tradeSetups["\s:]+(\[[\s\S]*?\])/i);
    if (jsonMatch) {
      try {
        const setups = JSON.parse(jsonMatch[1]);
        if (Array.isArray(setups)) {
          return setups.map(setup => ({
            pattern: String(setup.pattern || ''),
            direction: (String(setup.direction || 'long')).toLowerCase() as 'long' | 'short',
            entry: String(setup.entry || ''),
            stopLoss: String(setup.stopLoss || ''),
            target: String(setup.target || ''),
            probability: parseInt(String(setup.probability || '70'), 10)
          }));
        }
      } catch (e) {
        console.warn('JSON trade setup parsing failed, falling back to text parsing');
      }
    }

    // Fallback to text parsing
    const setupsText = content.match(/TRADE_SETUPS:?\s*([\s\S]*?)(?=\n[A-Z]|$)/i)?.[1] || '';
    const setups = setupsText.split(/\n-\s*/).filter(Boolean);

    return setups.map(setup => ({
      pattern: setup.match(/Pattern:?\s*([^,\n]+)/i)?.[1]?.trim() || '',
      direction: (setup.match(/Direction:?\s*(long|short)/i)?.[1]?.toLowerCase() || 'long') as 'long' | 'short',
      entry: setup.match(/Entry:?\s*([^,\n]+)/i)?.[1]?.trim() || '',
      stopLoss: setup.match(/Stop Loss:?\s*([^,\n]+)/i)?.[1]?.trim() || '',
      target: setup.match(/Target:?\s*([^,\n]+)/i)?.[1]?.trim() || '',
      probability: parseInt(setup.match(/Probability:?\s*(\d+)/i)?.[1] || '70', 10)
    }));
  } catch (error) {
    console.error('Trade setup extraction error:', error);
    return [];
  }
}