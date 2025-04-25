import { PAYMENT_CONFIG } from '../config/constants';

export const PaymentStorage = {
  setPaymentStatus(paid: boolean): void {
    localStorage.setItem(PAYMENT_CONFIG.STORAGE_KEYS.PAYMENT_STATUS, String(paid));
  },

  getPaymentStatus(): boolean {
    return localStorage.getItem(PAYMENT_CONFIG.STORAGE_KEYS.PAYMENT_STATUS) === 'true';
  },

  setAttempts(count: number): void {
    localStorage.setItem(PAYMENT_CONFIG.STORAGE_KEYS.ATTEMPTS, String(count));
  },

  getAttempts(): number {
    return parseInt(localStorage.getItem(PAYMENT_CONFIG.STORAGE_KEYS.ATTEMPTS) || '0', 10);
  },

  resetAttempts(): void {
    this.setAttempts(0);
  }
};