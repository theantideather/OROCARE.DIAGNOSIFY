import { JUPITER_ENDPOINTS } from '../constants';
import type { Token } from '../types';

export class JupiterTokenService {
  private static tokens: Token[] | null = null;

  static async getTokens(): Promise<Token[]> {
    if (this.tokens) return this.tokens;

    try {
      const response = await fetch('https://token.jup.ag/all');
      if (!response.ok) throw new Error('Failed to fetch tokens');
      
      const data = await response.json();
      this.tokens = data.map((token: any) => ({
        mint: token.address,
        symbol: token.symbol,
        name: token.name,
        decimals: token.decimals,
        logoURI: token.logoURI
      }));

      return this.tokens;
    } catch (error) {
      console.error('Failed to fetch Jupiter tokens:', error);
      throw error;
    }
  }

  static async searchTokens(query: string): Promise<Token[]> {
    const tokens = await this.getTokens();
    const searchTerm = query.toLowerCase();
    
    return tokens.filter(token => 
      token.symbol.toLowerCase().includes(searchTerm) ||
      token.name.toLowerCase().includes(searchTerm) ||
      token.mint.toLowerCase() === searchTerm
    );
  }
}