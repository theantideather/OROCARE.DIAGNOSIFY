import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_MODELS } from '../config/models';
import { GENERATION_CONFIG } from '../config/generation';
import { GeminiClientError } from '../error/GeminiClientError';
import { validateApiKey } from '../utils/validators';
import { ImageProcessor } from '../utils/ImageProcessor';

export class GeminiClient {
  private model: any;
  private imageProcessor: ImageProcessor;

  constructor(apiKey: string) {
    try {
      validateApiKey(apiKey);
      
      const genAI = new GoogleGenerativeAI(apiKey);
      this.model = genAI.getGenerativeModel({
        model: GEMINI_MODELS.VISION,
        generationConfig: GENERATION_CONFIG
      });

      this.imageProcessor = new ImageProcessor();

      if (!this.model) {
        throw new Error('Failed to initialize Gemini model');
      }
    } catch (error: any) {
      console.error('Gemini initialization error:', error);
      throw new GeminiClientError(error.message || 'Failed to initialize Gemini model');
    }
  }

  async generateContent(prompt: string, imageData: string): Promise<string> {
    try {
      const processedImageData = await this.imageProcessor.processImage(imageData);
      
      const parts = [
        { text: prompt },
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: processedImageData
          }
        }
      ];

      const result = await this.model.generateContent(parts);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.error('Content generation error:', error);
      throw new GeminiClientError(error.message || 'Failed to generate content');
    }
  }
}