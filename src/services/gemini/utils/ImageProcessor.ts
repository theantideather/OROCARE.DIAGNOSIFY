export class ImageProcessor {
  async processImage(imageData: string): Promise<string> {
    try {
      return imageData.includes('base64,') ? 
        imageData.split('base64,')[1] : 
        imageData;
    } catch (error) {
      throw new Error('Failed to process image data');
    }
  }

  validateFormat(mimeType: string): boolean {
    return ['image/jpeg', 'image/png', 'image/webp'].includes(mimeType);
  }

  getImageFormat(dataUrl: string): string {
    const match = dataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
    return match ? match[1] : 'application/octet-stream';
  }
}