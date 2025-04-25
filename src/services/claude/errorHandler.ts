import { CLAUDE_CONFIG } from './config';

export class AIErrorHandler {
  static handleError(error: any): Error {
    // Handle Claude specific errors
    if (error.type === 'authentication_error') {
      return new Error(CLAUDE_CONFIG.ERROR_MESSAGES.UNAUTHORIZED);
    }

    if (error.type === 'rate_limit_error') {
      return new Error(CLAUDE_CONFIG.ERROR_MESSAGES.RATE_LIMIT);
    }

    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      return new Error(CLAUDE_CONFIG.ERROR_MESSAGES.NETWORK_ERROR);
    }

    // Handle validation errors
    if (error.message === 'No image data provided') {
      return new Error('Please provide an image for analysis');
    }

    // Handle parsing errors
    if (error.message === CLAUDE_CONFIG.ERROR_MESSAGES.INVALID_RESPONSE) {
      return new Error('Unable to analyze the image. Please try again');
    }

    // Default error
    return new Error(error.message || CLAUDE_CONFIG.ERROR_MESSAGES.GENERAL);
  }
}