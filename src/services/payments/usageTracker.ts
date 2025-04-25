import { PAYMENT_CONFIG } from './config';

export class UsageTracker {
  static getAttempts(): number {
    return parseInt(localStorage.getItem(PAYMENT_CONFIG.STORAGE_KEY) || '0', 10);
  }

  static incrementAttempts(): void {
    const attempts = this.getAttempts();
    localStorage.setItem(PAYMENT_CONFIG.STORAGE_KEY, (attempts + 1).toString());
  }

  static resetAttempts(): void {
    localStorage.setItem(PAYMENT_CONFIG.STORAGE_KEY, '0');
  }

  static hasPaid(): boolean {
    return localStorage.getItem(PAYMENT_CONFIG.PAYMENT_STORAGE_KEY) === 'true';
  }

  static setPaid(status: boolean): void {
    localStorage.setItem(PAYMENT_CONFIG.PAYMENT_STORAGE_KEY, status.toString());
  }

  static getMaxAttempts(): number {
    return this.hasPaid() ? PAYMENT_CONFIG.PAID_ATTEMPTS : PAYMENT_CONFIG.FREE_ATTEMPTS;
  }

  static needsPayment(): boolean {
    return !this.hasPaid() && this.getAttempts() >= PAYMENT_CONFIG.FREE_ATTEMPTS;
  }

  static getRemainingAttempts(): number {
    const maxAttempts = this.getMaxAttempts();
    return Math.max(0, maxAttempts - this.getAttempts());
  }
}