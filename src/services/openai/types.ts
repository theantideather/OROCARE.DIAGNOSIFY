export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export interface AIAnalysisError extends Error {
  code?: string;
  status?: number;
}