import { HeliusConnection } from '../connection/heliusConnection';
import type { TransactionOptions } from '../types';

export class TransactionService {
  static async processTransaction(
    transaction: string,
    options: TransactionOptions = {}
  ): Promise<string> {
    const connection = HeliusConnection.getInstance();
    
    // Get latest blockhash
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

    // Send transaction
    const txid = await connection.sendRawTransaction(transaction, {
      skipPreflight: true,
      maxRetries: 3,
      preflightCommitment: 'confirmed',
      ...options
    });

    // Confirm transaction
    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature: txid
    });

    return txid;
  }
}