import { GEMINI_CONFIG } from './config';

export class AIErrorHandler {
  static handleError(error: any): Error {
    // Handle Gemini specific errors
    if (error.message?.includes('API_KEY')) {
      return new Error(GEMINI_CONFIG.ERROR_MESSAGES.UNAUTHORIZED);
    }

    if (error.message?.includes('RESOURCE_EXHAUSTED')) {
      return new Error(GEMINI_CONFIG.ERROR_MESSAGES.RATE_LIMIT);
    }

    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      return new Error(GEMINI_CONFIG.ERROR_MESSAGES.NETWORK_ERROR);
    }

    // Handle validation errors
    if (error.message === 'No image data provided') {
      return new Error('Please provide an image for analysis');
    }

    // Handle parsing errors
    if (error.message === GEMINI_CONFIG.ERROR_MESSAGES.INVALID_RESPONSE) {
      return new Error('Unable to analyze the image. Please try again');
    }

    // Default error
    return new Error(error.message || GEMINI_CONFIG.ERROR_MESSAGES.GENERAL);
  }
}