import { ConditionAnalysis } from '../../types';

export interface ClaudeResponse {
  content: Array<{
    text: string;
    type: string;
  }>;
}

export interface ClaudeError extends Error {
  type?: string;
  status?: number;
}

export interface ClaudeAnalysisResult extends ConditionAnalysis {
  rawResponse?: string;
}