export interface GeminiConfig {
  model: string;
  generationConfig: {
    temperature: number;
    topP: number;
    topK: number;
    maxOutputTokens: number;
  };
}

export interface GeminiError extends Error {
  code?: string;
  status?: number;
}

export interface GeminiResponse {
  text: string;
}

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: (string | { inlineData: { mimeType: string; data: string } })[];
}