import { OPENAI_CONFIG } from './config';

export class ImageValidator {
  async validate(imageBase64: string): Promise<void> {
    // Check if the image is a valid base64 string
    if (!this.isValidBase64(imageBase64)) {
      throw new Error('Invalid image data');
    }

    // Check image size
    const sizeInBytes = this.calculateBase64Size(imageBase64);
    if (sizeInBytes > OPENAI_CONFIG.MAX_IMAGE_SIZE) {
      throw new Error(OPENAI_CONFIG.ERROR_MESSAGES.IMAGE_TOO_LARGE);
    }

    // Check image format
    const format = this.getImageFormat(imageBase64);
    if (!OPENAI_CONFIG.SUPPORTED_IMAGE_FORMATS.includes(format)) {
      throw new Error(OPENAI_CONFIG.ERROR_MESSAGES.UNSUPPORTED_FORMAT);
    }
  }

  private isValidBase64(str: string): boolean {
    if (!str?.length) return false;
    try {
      return btoa(atob(str.split(',')[1] || str)) === (str.split(',')[1] || str);
    } catch (err) {
      return false;
    }
  }

  private calculateBase64Size(base64String: string): number {
    const padding = base64String.endsWith('==') ? 2 : base64String.endsWith('=') ? 1 : 0;
    const base64Length = base64String.length;
    return (base64Length * 3) / 4 - padding;
  }

  private getImageFormat(base64String: string): string {
    const match = base64String.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
    return match ? match[1] : 'application/octet-stream';
  }
}