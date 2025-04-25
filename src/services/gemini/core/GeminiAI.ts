import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiClientError } from '../error/GeminiClientError';
import { validateApiKey } from '../utils/validators';
import { GEMINI_CONFIG } from '../config';
import type { GenerateContentOptions } from '../types';

export class GeminiAI {
  private model: any;
  private static instance: GeminiAI;

  private constructor(apiKey: string) {
    try {
      validateApiKey(apiKey);
      const genAI = new GoogleGenerativeAI(apiKey);
      this.model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: GEMINI_CONFIG.MODEL.GENERATION_CONFIG
      });
    } catch (error: any) {
      throw new GeminiClientError(error.message || 'Failed to initialize Gemini model');
    }
  }

  static getInstance(apiKey: string): GeminiAI {
    if (!GeminiAI.instance) {
      GeminiAI.instance = new GeminiAI(apiKey);
    }
    return GeminiAI.instance;
  }

  async generateContent(prompt: string, options?: GenerateContentOptions): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      throw new GeminiClientError(error.message || 'Failed to generate content');
    }
  }
}