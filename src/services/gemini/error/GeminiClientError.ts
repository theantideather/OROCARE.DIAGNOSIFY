export class GeminiClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GeminiClientError';
  }
}