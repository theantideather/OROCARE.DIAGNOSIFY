import { ChartAnalysis } from '../../../../types';
import { GeminiClient } from '../../core/GeminiClient';
import { ImageValidator } from '../../validation/validators/ImageValidator';
import { GeminiResponseParser } from '../../parser/responseParser';
import { ErrorHandler } from '../../error/errorHandler';
import { CHART_ANALYSIS_PROMPT } from '../../prompts/chartPrompt';
import { GEMINI_CONFIG } from '../../config';

export class ChartAnalyzer {
  private client: GeminiClient;
  private parser: GeminiResponseParser;
  private validator: ImageValidator;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error(GEMINI_CONFIG.ERROR_MESSAGES.NO_API_KEY);
    }
    
    this.client = new GeminiClient(apiKey);
    this.parser = new GeminiResponseParser();
    this.validator = new ImageValidator();
  }

  async analyzeChart(imageBase64: string): Promise<ChartAnalysis> {
    try {
      // Validate image
      this.validator.validate(imageBase64);

      // Get analysis from Gemini
      const response = await this.client.generateContent(
        CHART_ANALYSIS_PROMPT,
        imageBase64
      );

      if (!response) {
        throw new Error(GEMINI_CONFIG.ERROR_MESSAGES.INVALID_RESPONSE);
      }

      // Parse and return the analysis
      return this.parser.parse(response);

    } catch (error) {
      console.error('Chart Analysis Error:', error);
      throw ErrorHandler.handle(error);
    }
  }
}