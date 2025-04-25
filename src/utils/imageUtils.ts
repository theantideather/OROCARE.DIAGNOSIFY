import { APP_CONFIG } from './constants';

export function validateImage(file: File): string | null {
  if (file.size > APP_CONFIG.IMAGE_CAPTURE.maxSize) {
    return 'Image size exceeds maximum allowed size (5MB)';
  }
  
  if (!APP_CONFIG.IMAGE_CAPTURE.acceptedFormats.includes(file.type)) {
    return 'Invalid image format. Please upload a JPEG or PNG file';
  }
  
  return null;
}

export function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Could not compress image'));
              return;
            }
            resolve(new File([blob], file.name, { type: file.type }));
          },
          file.type,
          APP_CONFIG.IMAGE_CAPTURE.quality
        );
      };
    };
    
    reader.onerror = () => reject(new Error('Could not read file'));
  });
}