export interface BybitWalletConfig {
  apiKey: string;
  apiSecret: string;
}

export class BybitWallet {
  private static config: BybitWalletConfig | null = null;

  static isConnected(): boolean {
    return !!this.config;
  }

  static connect(apiKey: string, apiSecret: string): void {
    if (!apiKey || !apiSecret) {
      throw new Error('API key and secret are required');
    }
    this.config = { apiKey, apiSecret };
  }

  static disconnect(): void {
    this.config = null;
  }

  static getConfig(): BybitWalletConfig | null {
    return this.config;
  }
}