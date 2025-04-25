import { GeminiClientError } from '../error/GeminiClientError';

export function validateApiKey(apiKey: string | undefined): void {
  if (!apiKey) {
    throw new GeminiClientError('API key is required');
  }
  
  if (typeof apiKey !== 'string' || apiKey.trim().length === 0) {
    throw new GeminiClientError('Invalid API key format');
  }
}