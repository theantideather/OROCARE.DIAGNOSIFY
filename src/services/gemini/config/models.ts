export const GEMINI_MODELS = {
  VISION: 'gemini-1.5-flash',  // Using the correct model name
  TEXT: 'gemini-1.5-flash',
  CHAT: 'gemini-1.5-flash'
} as const;

export type GeminiModel = typeof GEMINI_MODELS[keyof typeof GEMINI_MODELS];