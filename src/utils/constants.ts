export const TRADING_DISCLAIMER = `This is an AI-assisted analysis and should not be considered as financial advice. 
Trading carries significant risks, and all investment decisions should be made after thorough research and consultation with financial professionals.`;

export const APP_CONFIG = {
  MIN_CONFIDENCE: 70,
  MAX_CONFIDENCE: 95,
  IMAGE_QUALITY: 0.8,
  ANALYSIS_DELAY: 2000,
  IMAGE_CAPTURE: {
    maxSize: 5 * 1024 * 1024, // 5MB
    acceptedFormats: ['image/jpeg', 'image/png'],
    quality: 0.8
  }
} as const;