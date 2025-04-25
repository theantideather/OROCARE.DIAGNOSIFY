export class CrossmintValidators {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validateApiKey(apiKey: string | undefined): void {
    if (!apiKey) {
      throw new Error('Crossmint API key is required');
    }
  }
}