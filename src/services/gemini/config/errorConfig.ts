export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Invalid API key. Please check your Gemini credentials.',
  RATE_LIMIT: 'Rate limit exceeded. Please try again later.',
  SERVER_ERROR: 'Gemini service is temporarily unavailable.',
  INVALID_RESPONSE: 'Unable to process the AI response.',
  GENERAL: 'An error occurred during analysis.',
  MODEL_ERROR: 'AI model configuration error. Please check model name and try again.',
  NETWORK_ERROR: 'Network error: Unable to connect to AI service.',
  IMAGE_ERROR: 'Error processing image. Please try again.',
  NO_API_KEY: 'Gemini API key is not configured. Please check your .env file.',
  MODEL_INIT_ERROR: 'Failed to initialize Gemini model. Please check model configuration.'
} as const;