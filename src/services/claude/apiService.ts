import Anthropic from '@anthropic-ai/sdk';
import { ConditionType } from '../../types';
import { CLAUDE_CONFIG } from './config';
import { AIErrorHandler } from './errorHandler';
import { AIResponseParser } from './responseParser';
import { ImageValidator } from './imageValidator';

export class ClaudeService {
  private client: Anthropic;
  private imageValidator: ImageValidator;

  constructor() {
    const apiKey = import.meta.env.VITE_CLAUDE_API_KEY;
    if (!apiKey) {
      throw new Error('Claude API key is not configured. Please check your .env file.');
    }
    this.client = new Anthropic({ apiKey });
    this.imageValidator = new ImageValidator();
  }

  async analyzeImage(imageBase64: string, conditionType: ConditionType) {
    try {
      if (!imageBase64) {
        throw new Error('No image data provided');
      }

      // Validate the image
      await this.imageValidator.validate(imageBase64);

      // Extract base64 data if it includes the data URL prefix
      const base64Data = imageBase64.split(',')[1] || imageBase64;

      const response = await this.client.messages.create({
        model: CLAUDE_CONFIG.MODEL,
        max_tokens: CLAUDE_CONFIG.MAX_TOKENS,
        temperature: CLAUDE_CONFIG.TEMPERATURE,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Please analyze this ${conditionType} condition image and provide a detailed medical analysis. Structure your response exactly as follows:

DIAGNOSIS: [Provide a clear, specific diagnosis]
SEVERITY: [Indicate either low, medium, or high]
CONFIDENCE: [Provide a percentage between 0-100]
RECOMMENDATIONS:
- [List specific recommendations, one per line]
FOLLOW-UP: [Specific follow-up instructions]`
            },
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: base64Data
              }
            }
          ]
        }]
      });

      if (!response?.content?.[0]?.text) {
        throw new Error(CLAUDE_CONFIG.ERROR_MESSAGES.INVALID_RESPONSE);
      }

      const parser = new AIResponseParser(response.content[0].text);
      return parser.parse();

    } catch (error: any) {
      const handledError = AIErrorHandler.handleError(error);
      console.error('Claude Analysis Error:', handledError.message);
      throw handledError;
    }
  }
}