import { VersionedTransaction } from '@solana/web3.js';
import { HeliusConnection } from './connection/heliusConnection';
import { JupiterQuoteService } from './jupiter/jupiterQuoteService';
import { JupiterSwapService } from './jupiter/jupiterSwapService';
import { TransactionService } from './transaction/transactionService';
import { JUPITER_ENDPOINTS } from './constants';
import type { JupiterQuote, TradeResult } from './types';

export class JupiterService {
  static async executeTrade(params: JupiterQuote): Promise<TradeResult> {
    try {
      if (!window.phantom?.solana?.isConnected) {
        throw new Error('Wallet not connected');
      }

      // Get quote
      const quote = await JupiterQuoteService.getQuote(params);

      // Create swap transaction
      const swapTransaction = await JupiterSwapService.createSwapTransaction(
        quote,
        window.phantom.solana.publicKey.toString()
      );

      // Deserialize and sign transaction
      const transaction = VersionedTransaction.deserialize(
        Buffer.from(swapTransaction, 'base64')
      );
      
      const signedTransaction = await window.phantom.solana.signTransaction(transaction);
      const serializedTransaction = signedTransaction.serialize();

      // Process transaction
      const txid = await TransactionService.processTransaction(
        Buffer.from(serializedTransaction).toString('base64')
      );

      return { success: true, txId: txid };

    } catch (error: any) {
      console.error('Trade execution error:', error);
      return {
        success: false,
        error: error.message || 'Failed to execute trade'
      };
    }
  }
}