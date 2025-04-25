import { Transaction, VersionedTransaction } from '@solana/web3.js';

export interface PhantomWindow extends Window {
  phantom?: {
    solana?: {
      connect(): Promise<{ publicKey: { toString(): string } }>;
      disconnect(): Promise<void>;
      signTransaction(transaction: Transaction | VersionedTransaction): Promise<Transaction | VersionedTransaction>;
      isConnected: boolean;
      publicKey: { toString(): string };
    };
  };
}

declare global {
  interface Window extends PhantomWindow {}
}