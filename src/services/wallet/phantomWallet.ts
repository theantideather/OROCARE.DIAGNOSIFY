import { PublicKey } from '@solana/web3.js';

export class PhantomWallet {
  static async connect(): Promise<string | null> {
    try {
      if (!window.phantom?.solana) {
        throw new Error('Phantom wallet is not installed');
      }
      
      const connection = await window.phantom.solana.connect();
      return connection.publicKey.toString();
    } catch (error) {
      console.error('Wallet connection failed:', error);
      return null;
    }
  }

  static async disconnect(): Promise<void> {
    try {
      if (window.phantom?.solana) {
        await window.phantom.solana.disconnect();
      }
    } catch (error) {
      console.error('Wallet disconnect failed:', error);
    }
  }

  static isConnected(): boolean {
    return window.phantom?.solana?.isConnected || false;
  }

  static getPublicKey(): PublicKey | null {
    return window.phantom?.solana?.publicKey || null;
  }
}