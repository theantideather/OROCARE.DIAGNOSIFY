import { ChartAnalysis } from '../types';
import { GeminiService } from './gemini';

export async function analyzeChart(imageData: string): Promise<ChartAnalysis> {
  try {
    if (!imageData) {
      throw new Error('No image data provided');
    }

    const geminiService = new GeminiService();
    return await geminiService.analyzeChart(imageData);
  } catch (error: any) {
    console.error('Analysis error:', error.message);
    throw error;
  }
}