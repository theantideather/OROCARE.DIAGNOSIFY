import { Connection, ConnectionConfig } from '@solana/web3.js';

export class HeliusConnection {
  private static instance: Connection;

  static getInstance(): Connection {
    if (!this.instance) {
      const config: ConnectionConfig = {
        commitment: 'confirmed',
        wsEndpoint: `wss://rpc.helius.xyz/?api-key=${import.meta.env.VITE_HELIUS_RPC_URL}`
      };

      this.instance = new Connection(
        `https://rpc.helius.xyz/?api-key=${import.meta.env.VITE_HELIUS_RPC_URL}`,
        config
      );
    }
    return this.instance;
  }

  static async getPriorityFee(): Promise<number> {
    const connection = this.getInstance();
    const fees = await connection.getRecentPrioritizationFees();
    return fees.reduce((a, b) => Math.max(a, b.prioritizationFee), 0);
  }
}