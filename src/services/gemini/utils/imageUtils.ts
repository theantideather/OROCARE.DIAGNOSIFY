export function isValidBase64(str: string): boolean {
  try {
    return btoa(atob(str)) === str;
  } catch {
    return false;
  }
}

export function extractBase64Data(imageBase64: string): string {
  return imageBase64.split('base64,')[1] || imageBase64;
}

export function getMimeType(dataUrl: string): string {
  const match = dataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
  return match ? match[1] : '';
}

export function isValidMimeType(mimeType: string): boolean {
  return ['image/jpeg', 'image/png', 'image/webp'].includes(mimeType);
}