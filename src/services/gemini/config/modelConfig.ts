import { GEMINI_MODELS } from './models';
import { GENERATION_CONFIG } from './generation';

export const MODEL_CONFIG = {
  NAME: GEMINI_MODELS.VISION,
  GENERATION_CONFIG
} as const;