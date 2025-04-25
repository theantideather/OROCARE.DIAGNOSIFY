import { Token } from '../types';

export class JupiterFallback {
  static getSwapUrl(inputToken: Token, outputToken: Token): string {
    return `https://jup.ag/swap/${inputToken.symbol}-${outputToken.symbol}`;
  }

  static getFallbackUrl(): string {
    return 'https://jup.ag/swap';
  }

  static redirectToJupiter(inputToken: Token, outputToken: Token): void {
    try {
      const url = this.getSwapUrl(inputToken, outputToken);
      window.open(url, '_blank');
    } catch (error) {
      window.open(this.getFallbackUrl(), '_blank');
    }
  }
}