import { OPENAI_CONFIG } from './config';
import { ChartAnalysis } from '../../types';
import { RetryHandler } from './retryHandler';

export class OpenAIService {
  private apiKey: string;

  constructor() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured');
    }
    this.apiKey = apiKey;
  }

  async analyzeChart(imageBase64: string): Promise<ChartAnalysis> {
    try {
      const response = await RetryHandler.withRetry(
        () => this.makeAPIRequest(imageBase64),
        OPENAI_CONFIG.RETRY_ATTEMPTS,
        OPENAI_CONFIG.RETRY_DELAY
      );

      const data = await response.json();
      return this.parseResponse(data);
    } catch (error: any) {
      console.error('OpenAI Analysis Error:', error);
      throw error;
    }
  }

  private async makeAPIRequest(imageBase64: string) {
    const prompt = `Analyze this trading chart and provide detailed technical analysis. Include:
1. Overall trend (bullish/bearish/neutral)
2. Key support levels
3. Key resistance levels
4. Notable chart patterns
5. Confidence level (0-100%)

Format the response as follows:
TREND: [trend]
CONFIDENCE: [number]
SUPPORT_LEVELS: [list]
RESISTANCE_LEVELS: [list]
PATTERNS: [list]`;

    return fetch(OPENAI_CONFIG.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: OPENAI_CONFIG.MODEL,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64.startsWith('data:') 
                    ? imageBase64 
                    : `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        max_tokens: OPENAI_CONFIG.MAX_TOKENS
      })
    });
  }

  private parseResponse(data: any): ChartAnalysis {
    const content = data.choices[0].message.content;
    
    // Extract information using regex
    const trend = (content.match(/TREND:\s*(bullish|bearish|neutral)/i)?.[1] || 'neutral').toLowerCase();
    const confidence = parseInt(content.match(/CONFIDENCE:\s*(\d+)/i)?.[1] || '85', 10);
    
    const supportLevels = content
      .match(/SUPPORT_LEVELS:\s*([\s\S]*?)(?=\n\w|$)/i)?.[1]
      .split('\n')
      .filter(Boolean)
      .map((level: string) => level.trim()) || [];
      
    const resistanceLevels = content
      .match(/RESISTANCE_LEVELS:\s*([\s\S]*?)(?=\n\w|$)/i)?.[1]
      .split('\n')
      .filter(Boolean)
      .map((level: string) => level.trim()) || [];
      
    const patterns = content
      .match(/PATTERNS:\s*([\s\S]*?)(?=\n\w|$)/i)?.[1]
      .split('\n')
      .filter(Boolean)
      .map((pattern: string) => pattern.trim()) || [];

    return {
      trend: trend as 'bullish' | 'bearish' | 'neutral',
      confidence,
      supportLevels,
      resistanceLevels,
      patterns
    };
  }
}