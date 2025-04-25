export const CLAUDE_CONFIG = {
  MODEL: 'claude-3-opus-20240229',
  MAX_TOKENS: 1024,
  RETRY_ATTEMPTS: 2,
  RETRY_DELAY: 1000,
  TEMPERATURE: 0.7,
  MAX_IMAGE_SIZE: 100 * 1024 * 1024, // 100MB limit for Claude
  SUPPORTED_IMAGE_FORMATS: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ERROR_MESSAGES: {
    UNAUTHORIZED: 'Invalid API key. Please check your Claude credentials.',
    RATE_LIMIT: 'Rate limit exceeded. Please try again later.',
    SERVER_ERROR: 'Claude service is temporarily unavailable.',
    INVALID_RESPONSE: 'Unable to process the AI response.',
    GENERAL: 'An error occurred during analysis.',
    MODEL_ERROR: 'AI model configuration error. Please try again.',
    NETWORK_ERROR: 'Network error: Unable to connect to AI service.',
    IMAGE_TOO_LARGE: 'Image size exceeds the maximum limit of 100MB.',
    UNSUPPORTED_FORMAT: 'Unsupported image format. Please use JPEG, PNG, WebP, or GIF.',
  }
} as const;