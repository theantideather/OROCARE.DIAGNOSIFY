import { CrossmintValidators } from './validators';
import { CROSSMINT_CONFIG } from './config';
import type { CrossmintResponse, WalletCreationParams } from './types';

export class CrossmintService {
  private static apiKey: string;
  private static retryAttempts = 3;
  private static retryDelay = 1000;

  static initialize(apiKey: string): void {
    CrossmintValidators.validateApiKey(apiKey);
    this.apiKey = apiKey;
  }

  static async createCustodialWallet(email: string): Promise<CrossmintResponse> {
    try {
      if (!CrossmintValidators.validateEmail(email)) {
        throw new Error(CROSSMINT_CONFIG.ERROR_MESSAGES.INVALID_EMAIL);
      }

      const params: WalletCreationParams = {
        type: 'solana-custodial-wallet',
        email: email
      };

      return await this.executeWithRetry(() => this.makeRequest(
        CROSSMINT_CONFIG.ENDPOINTS.WALLETS,
        'POST',
        params
      ));

    } catch (error: any) {
      console.error('Crossmint wallet creation error:', error);
      return {
        success: false,
        error: error.message || CROSSMINT_CONFIG.ERROR_MESSAGES.WALLET_CREATION_FAILED
      };
    }
  }

  private static async makeRequest(
    endpoint: string,
    method: string,
    body?: any
  ): Promise<CrossmintResponse> {
    try {
      const response = await fetch(`${CROSSMINT_CONFIG.API_URL}${endpoint}`, {
        method,
        headers: {
          'X-API-KEY': this.apiKey,
          'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
      }

      const data = await response.json();
      return { success: true, data };

    } catch (error: any) {
      throw new Error(error.message || CROSSMINT_CONFIG.ERROR_MESSAGES.NETWORK_ERROR);
    }
  }

  private static async executeWithRetry<T>(
    operation: () => Promise<T>
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        return await operation();
      } catch (error: any) {
        lastError = error;
        if (attempt === this.retryAttempts) break;
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
      }
    }

    throw lastError || new Error('Operation failed after retries');
  }
}