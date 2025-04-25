export const GEMINI_CONFIG = {
  MODEL: 'gemini-1.5-pro-vision-latest',  // Updated to use Gemini 1.5 Pro Vision
  GENERATION_CONFIG: {
    temperature: 0.1, // Lower temperature for more focused responses
    topP: 0.5,      // Lower top_p for more deterministic outputs
    topK: 16,       // Reduced for more focused token selection
    maxOutputTokens: 1024,
  },
  ERROR_MESSAGES: {
    UNAUTHORIZED: 'Invalid API key. Please check your Gemini credentials.',
    RATE_LIMIT: 'Rate limit exceeded. Please try again later.',
    SERVER_ERROR: 'Gemini service is temporarily unavailable.',
    INVALID_RESPONSE: 'Unable to process the AI response.',
    GENERAL: 'An error occurred during analysis.',
    MODEL_ERROR: 'AI model configuration error. Please try again.',
    NETWORK_ERROR: 'Network error: Unable to connect to AI service.',
    IMAGE_ERROR: 'Error processing image. Please try again.',
    NO_API_KEY: 'Gemini API key is not configured. Please check your .env file.'
  }
} as const;