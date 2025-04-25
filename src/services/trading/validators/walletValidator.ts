export class WalletValidator {
  static async validateConnection(): Promise<string> {
    if (!window.phantom?.solana) {
      throw new Error('Phantom wallet not installed');
    }

    if (!window.phantom.solana.isConnected) {
      try {
        const connection = await window.phantom.solana.connect();
        return connection.publicKey.toString();
      } catch (error: any) {
        throw new Error(`Wallet connection failed: ${error.message}`);
      }
    }

    return window.phantom.solana.publicKey.toString();
  }

  static async validateBalance(amount: number): Promise<void> {
    try {
      const balance = await window.phantom?.solana?.getBalance();
      if (!balance || balance < amount) {
        throw new Error('Insufficient balance for trade');
      }
    } catch (error: any) {
      throw new Error(`Balance check failed: ${error.message}`);
    }
  }
}