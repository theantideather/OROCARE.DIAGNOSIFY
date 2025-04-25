export interface PhantomWindow extends Window {
  phantom?: {
    solana?: {
      connect(): Promise<{ publicKey: { toString(): string } }>;
      disconnect(): Promise<void>;
      isConnected: boolean;
      publicKey: { toString(): string };
    };
  };
}

declare global {
  interface Window extends PhantomWindow {}
}