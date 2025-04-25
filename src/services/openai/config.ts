export const OPENAI_CONFIG = {
  API_URL: 'https://api.openai.com/v1/chat/completions',
  MODEL: 'gpt-4-vision-preview', // Reverting back to the correct model name
  MAX_TOKENS: 500,
  RETRY_ATTEMPTS: 2,
  RETRY_DELAY: 1000,
  TEMPERATURE: 0.7,
  MAX_IMAGE_SIZE: 20971520, // 20MB limit for OpenAI
  SUPPORTED_IMAGE_FORMATS: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ERROR_MESSAGES: {
    UNAUTHORIZED: 'Invalid API key. Please check your OpenAI credentials.',
    RATE_LIMIT: 'Rate limit exceeded. Please try again later.',
    SERVER_ERROR: 'OpenAI service is temporarily unavailable.',
    INVALID_RESPONSE: 'Unable to process the AI response.',
    GENERAL: 'An error occurred during analysis.',
    MODEL_ERROR: 'AI model configuration error. Please try again.',
    NETWORK_ERROR: 'Network error: Unable to connect to AI service.',
    IMAGE_TOO_LARGE: 'Image size exceeds the maximum limit of 20MB.',
    UNSUPPORTED_FORMAT: 'Unsupported image format. Please use JPEG, PNG, WebP, or GIF.',
  }
} as const;