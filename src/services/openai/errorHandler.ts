import { AIAnalysisError } from './types';
import { OPENAI_CONFIG } from './config';

export class AIErrorHandler {
  static handleError(error: any): AIAnalysisError {
    // Handle OpenAI specific errors
    if (error.message?.includes('model')) {
      return new Error(OPENAI_CONFIG.ERROR_MESSAGES.MODEL_ERROR);
    }

    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      return new Error(OPENAI_CONFIG.ERROR_MESSAGES.NETWORK_ERROR);
    }

    // Handle API errors
    if (error.status) {
      switch (error.status) {
        case 401:
          return new Error(OPENAI_CONFIG.ERROR_MESSAGES.UNAUTHORIZED);
        case 429:
          return new Error(OPENAI_CONFIG.ERROR_MESSAGES.RATE_LIMIT);
        case 503:
          return new Error(error.message || OPENAI_CONFIG.ERROR_MESSAGES.SERVER_ERROR);
        default:
          if (error.status >= 500) {
            return new Error(OPENAI_CONFIG.ERROR_MESSAGES.SERVER_ERROR);
          }
      }
    }

    // Handle validation errors
    if (error.message === 'No image data provided') {
      return new Error('Please provide an image for analysis');
    }

    // Handle parsing errors
    if (error.message === OPENAI_CONFIG.ERROR_MESSAGES.INVALID_RESPONSE) {
      return new Error('Unable to analyze the image. Please try again');
    }

    // Default error
    return new Error(error.message || OPENAI_CONFIG.ERROR_MESSAGES.GENERAL);
  }
}