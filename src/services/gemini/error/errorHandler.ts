import { GeminiClientError } from './GeminiClientError';
import { GEMINI_CONFIG } from '../config';

export class ErrorHandler {
  static handle(error: any): Error {
    if (error instanceof GeminiClientError) {
      return error;
    }

    // Add specific error handling for Gemini 1.5 Flash model
    if (error.message?.includes('Must provide a model name')) {
      return new GeminiClientError('Invalid model configuration. Using gemini-1.5-flash.');
    }

    if (error.message?.includes('API_KEY')) {
      return new GeminiClientError(GEMINI_CONFIG.ERROR_MESSAGES.UNAUTHORIZED);
    }

    if (error.message?.includes('RESOURCE_EXHAUSTED')) {
      return new GeminiClientError(GEMINI_CONFIG.ERROR_MESSAGES.RATE_LIMIT);
    }

    if (error.message?.includes('Failed to fetch')) {
      return new GeminiClientError(GEMINI_CONFIG.ERROR_MESSAGES.NETWORK_ERROR);
    }

    return new GeminiClientError(
      error.message || GEMINI_CONFIG.ERROR_MESSAGES.GENERAL
    );
  }
}