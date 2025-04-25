import { GeminiAI } from '../core/GeminiAI';
import { GeminiClientError } from '../error/GeminiClientError';
import type { GenerateContentOptions } from '../types';

export async function generateContent(
  prompt: string,
  options?: GenerateContentOptions
): Promise<string> {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new GeminiClientError('API key not found in environment variables');
    }

    const gemini = GeminiAI.getInstance(apiKey);
    return await gemini.generateContent(prompt, options);
  } catch (error) {
    if (error instanceof GeminiClientError) {
      throw error;
    }
    throw new GeminiClientError('Failed to generate content');
  }
}