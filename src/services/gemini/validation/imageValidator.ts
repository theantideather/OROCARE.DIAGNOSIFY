import { 
  extractBase64Data, 
  isValidBase64, 
  getMimeType, 
  isValidMimeType 
} from '../utils';

export class ImageValidator {
  validate(imageBase64: string): void {
    if (!imageBase64) {
      throw new Error('No image data provided');
    }

    const base64Data = extractBase64Data(imageBase64);
    
    if (!isValidBase64(base64Data)) {
      throw new Error('Invalid image data format');
    }

    if (imageBase64.includes('data:')) {
      const mimeType = getMimeType(imageBase64);
      if (!isValidMimeType(mimeType)) {
        throw new Error('Invalid image format');
      }
    }
  }
}