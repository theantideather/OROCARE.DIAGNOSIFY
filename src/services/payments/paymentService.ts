import { PaymentScriptLoader } from './utils/scriptLoader';
import { PaymentStorage } from './utils/storage';
import { PAYMENT_CONFIG } from './config/constants';
import { PAYMENT_ERRORS } from './config/errors';
import type { PaymentResult } from './types';

export class PaymentService {
  static async initialize(): Promise<PaymentResult> {
    try {
      const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!keyId) {
        throw new Error(PAYMENT_ERRORS.INVALID_KEY);
      }

      await PaymentScriptLoader.load();

      const options = {
        key: keyId,
        amount: PAYMENT_CONFIG.AMOUNT,
        currency: PAYMENT_CONFIG.CURRENCY,
        name: PAYMENT_CONFIG.NAME,
        description: PAYMENT_CONFIG.DESCRIPTION,
        handler: this.handlePaymentSuccess,
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: PAYMENT_CONFIG.THEME_COLOR
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      return { success: true };
    } catch (error: any) {
      console.error('Payment initialization failed:', error);
      return {
        success: false,
        error: error.message || PAYMENT_ERRORS.INITIALIZATION
      };
    }
  }

  static incrementAttempts(): void {
    // Only increment if we haven't exceeded limits
    if (this.getRemainingAttempts() > 0) {
      const attempts = PaymentStorage.getAttempts();
      PaymentStorage.setAttempts(attempts + 1);
    }
  }

  static getPaymentStatus(): boolean {
    return PaymentStorage.getPaymentStatus();
  }

  static getRemainingAttempts(): number {
    const maxAttempts = this.getPaymentStatus() 
      ? PAYMENT_CONFIG.LIMITS.PAID_ATTEMPTS 
      : PAYMENT_CONFIG.LIMITS.FREE_ATTEMPTS;
    return Math.max(0, maxAttempts - PaymentStorage.getAttempts());
  }

  static getMaxAttempts(): number {
    return this.getPaymentStatus() 
      ? PAYMENT_CONFIG.LIMITS.PAID_ATTEMPTS 
      : PAYMENT_CONFIG.LIMITS.FREE_ATTEMPTS;
  }

  static needsPayment(): boolean {
    const attempts = PaymentStorage.getAttempts();
    const maxAttempts = this.getPaymentStatus() 
      ? PAYMENT_CONFIG.LIMITS.PAID_ATTEMPTS 
      : PAYMENT_CONFIG.LIMITS.FREE_ATTEMPTS;
    
    return attempts >= maxAttempts;
  }

  private static handlePaymentSuccess(response: any): void {
    if (!response.razorpay_payment_id) {
      throw new Error(PAYMENT_ERRORS.VALIDATION);
    }

    PaymentStorage.setPaymentStatus(true);
    PaymentStorage.resetAttempts();
    window.location.reload();
  }
}