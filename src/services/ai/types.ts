export interface AIServiceConfig {
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
}

export interface AIAnalysisOptions {
  retryAttempts?: number;
  retryDelay?: number;
  temperature?: number;
}

export * from '../claude/types';