import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_CONFIG } from '../config';
import { TRAINING_PROMPTS } from '../prompts/trainingPrompts';
import { CHART_ANALYSIS_PROMPT } from '../prompts/analysisPrompt';
import { GeminiMessage } from '../types';

export class ChatManager {
  private model: any;
  private chat: any;

  constructor(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({
      model: GEMINI_CONFIG.MODEL,
      generationConfig: GEMINI_CONFIG.GENERATION_CONFIG
    });
  }

  async initializeChat(): Promise<void> {
    this.chat = this.model.startChat({
      history: this.getTrainingHistory()
    });
  }

  async sendMessage(imageBase64: string): Promise<string> {
    if (!this.chat) {
      await this.initializeChat();
    }

    const result = await this.chat.sendMessage([
      CHART_ANALYSIS_PROMPT,
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageBase64.split(',')[1] || imageBase64
        }
      }
    ]);

    const response = await result.response;
    return response.text();
  }

  private getTrainingHistory(): GeminiMessage[] {
    return TRAINING_PROMPTS.map(prompt => ({
      role: 'user',
      parts: prompt
    }));
  }
}