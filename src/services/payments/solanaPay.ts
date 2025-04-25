import { PublicKey } from '@solana/web3.js';
import { encodeURL } from '@solana/pay';
import { PAYMENT_CONFIG } from './config';
import type { PaymentRequest, PaymentStatus } from './types';

export class SolanaPayService {
  static generateReference(): string {
    return crypto.randomUUID();
  }

  static createPaymentRequest(): PaymentRequest {
    return {
      recipient: PAYMENT_CONFIG.MERCHANT_ADDRESS,
      amount: PAYMENT_CONFIG.PAYMENT_AMOUNT,
      splToken: PAYMENT_CONFIG.USDC_MINT,
      reference: this.generateReference(),
      label: 'Chart Analysis Subscription',
      message: 'Payment for additional chart analysis attempts'
    };
  }

  static async initiatePayment(): Promise<string> {
    try {
      const request = this.createPaymentRequest();
      const url = encodeURL({
        ...request,
        recipient: new PublicKey(request.recipient)
      });
      return url.toString();
    } catch (error: any) {
      throw new Error(`Payment initiation failed: ${error.message}`);
    }
  }
}