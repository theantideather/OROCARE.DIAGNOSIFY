import { GEMINI_CONFIG } from './config';

export class ImageValidator {
  async validate(imageBase64: string): Promise<void> {
    // Extract the base64 data if it includes the data URL prefix
    const base64Data = imageBase64.split(',')[1] || imageBase64;

    // Check if the image is a valid base64 string
    if (!this.isValidBase64(base64Data)) {
      throw new Error('Invalid image data');
    }

    // Check image size
    const sizeInBytes = this.calculateBase64Size(base64Data);
    if (sizeInBytes > GEMINI_CONFIG.MAX_IMAGE_SIZE) {
      throw new Error(GEMINI_CONFIG.ERROR_MESSAGES.IMAGE_TOO_LARGE);
    }

    // Check image format from data URL
    if (imageBase64.includes('data:')) {
      const format = this.getImageFormat(imageBase64);
      if (!GEMINI_CONFIG.SUPPORTED_IMAGE_FORMATS.includes(format)) {
        throw new Error(GEMINI_CONFIG.ERROR_MESSAGES.UNSUPPORTED_FORMAT);
      }
    }
  }

  private isValidBase64(str: string): boolean {
    if (!str?.length) return false;
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  }

  private calculateBase64Size(base64String: string): number {
    const padding = base64String.endsWith('==') ? 2 : base64String.endsWith('=') ? 1 : 0;
    return (base64String.length * 3) / 4 - padding;
  }

  private getImageFormat(dataUrl: string): string {
    const match = dataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
    return match ? match[1] : 'application/octet-stream';
  }
}