import { RAZORPAY_CONFIG } from '../razorpay/config';

export class UsageTracker {
  static getAttempts(): number {
    return parseInt(localStorage.getItem(RAZORPAY_CONFIG.STORAGE_KEY) || '0', 10);
  }

  static incrementAttempts(): void {
    const attempts = this.getAttempts();
    localStorage.setItem(RAZORPAY_CONFIG.STORAGE_KEY, (attempts + 1).toString());
  }

  static resetAttempts(): void {
    localStorage.setItem(RAZORPAY_CONFIG.STORAGE_KEY, '0');
  }

  static hasPaid(): boolean {
    return localStorage.getItem(RAZORPAY_CONFIG.PAYMENT_STATUS_KEY) === 'true';
  }

  static needsPayment(): boolean {
    if (this.hasPaid()) {
      return this.getAttempts() >= RAZORPAY_CONFIG.PAID_ATTEMPTS;
    }
    return this.getAttempts() >= RAZORPAY_CONFIG.MAX_FREE_ATTEMPTS;
  }

  static getRemainingAttempts(): number {
    const maxAttempts = this.hasPaid() ? 
      RAZORPAY_CONFIG.PAID_ATTEMPTS : 
      RAZORPAY_CONFIG.MAX_FREE_ATTEMPTS;
    return Math.max(0, maxAttempts - this.getAttempts());
  }
}