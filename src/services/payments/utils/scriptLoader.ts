import { PAYMENT_ERRORS } from '../config/errors';

export class PaymentScriptLoader {
  private static instance: Promise<void> | null = null;
  private static readonly SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';
  private static readonly TIMEOUT = 10000;

  static load(): Promise<void> {
    if (!this.instance) {
      this.instance = new Promise((resolve, reject) => {
        if (this.isScriptLoaded()) {
          resolve();
          return;
        }

        const script = this.createScript();
        this.setupScriptHandlers(script, resolve, reject);
        document.body.appendChild(script);
      });
    }
    return this.instance;
  }

  private static isScriptLoaded(): boolean {
    return typeof window.Razorpay !== 'undefined';
  }

  private static createScript(): HTMLScriptElement {
    const script = document.createElement('script');
    script.src = this.SCRIPT_URL;
    script.async = true;
    script.crossOrigin = 'anonymous';
    return script;
  }

  private static setupScriptHandlers(
    script: HTMLScriptElement,
    resolve: () => void,
    reject: (error: Error) => void
  ): void {
    const timeout = setTimeout(() => {
      reject(new Error(PAYMENT_ERRORS.SCRIPT_TIMEOUT));
    }, this.TIMEOUT);

    script.onload = () => {
      if (this.isScriptLoaded()) {
        clearTimeout(timeout);
        resolve();
      } else {
        reject(new Error(PAYMENT_ERRORS.SCRIPT_LOAD));
      }
    };

    script.onerror = () => {
      clearTimeout(timeout);
      reject(new Error(PAYMENT_ERRORS.SCRIPT_LOAD));
    };
  }
}