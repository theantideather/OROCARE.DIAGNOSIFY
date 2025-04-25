// Add these types to your existing types file
export interface GenerateContentOptions {
  temperature?: number;
  topK?: number;
  topP?: number;
  maxOutputTokens?: number;
}

export interface GeminiResponse {
  text: string;
  safetyRatings?: Array<{
    category: string;
    probability: string;
  }>;
}