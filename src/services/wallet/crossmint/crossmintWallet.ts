import { CrossmintService } from './crossmintService';
import type { CrossmintWallet } from './types';

export class CrossmintWalletManager {
  private static wallet: CrossmintWallet | null = null;

  static async createWallet(email: string): Promise<boolean> {
    try {
      const response = await CrossmintService.createCustodialWallet(email);
      if (response.success && response.data) {
        this.wallet = response.data;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to create Crossmint wallet:', error);
      return false;
    }
  }

  static getWalletAddress(): string | null {
    return this.wallet?.address || null;
  }

  static isConnected(): boolean {
    return !!this.wallet;
  }

  static disconnect(): void {
    this.wallet = null;
  }
}