import { ChartAnalysis } from '../../../types';
import { GeminiClient } from '../core/GeminiClient';
import { ImageValidator } from '../validation/ImageValidator';
import { GeminiResponseParser } from '../parser/ResponseParser';
import { ErrorHandler } from '../error/ErrorHandler';
import { CHART_ANALYSIS_PROMPT } from '../prompts/chartPrompt';

export class ChartAnalyzer {
  private client: GeminiClient;
  private parser: GeminiResponseParser;
  private validator: ImageValidator;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    
    this.client = new GeminiClient(apiKey);
    this.parser = new GeminiResponseParser();
    this.validator = new ImageValidator();
  }

  async analyzeChart(imageBase64: string): Promise<ChartAnalysis> {
    try {
      this.validator.validate(imageBase64);
      const response = await this.client.generateContent(
        CHART_ANALYSIS_PROMPT,
        imageBase64
      );
      return this.parser.parse(response);
    } catch (error) {
      throw ErrorHandler.handle(error);
    }
  }
}