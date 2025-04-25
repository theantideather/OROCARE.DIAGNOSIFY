export class RazorpayLoader {
  private static instance: Promise<void> | null = null;
  private static readonly SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';
  private static readonly LOAD_TIMEOUT = 10000; // 10 seconds

  static loadScript(): Promise<void> {
    if (!this.instance) {
      this.instance = new Promise((resolve, reject) => {
        // Check if script already exists
        if (document.querySelector(`script[src="${this.SCRIPT_URL}"]`)) {
          if (typeof window.Razorpay !== 'undefined') {
            resolve();
            return;
          }
        }

        const script = document.createElement('script');
        script.src = this.SCRIPT_URL;
        script.async = true;
        script.crossOrigin = 'anonymous';

        script.onload = () => {
          if (typeof window.Razorpay !== 'undefined') {
            resolve();
          } else {
            reject(new Error('Razorpay failed to initialize'));
          }
        };

        script.onerror = () => reject(new Error('Failed to load Razorpay script'));

        const timeout = setTimeout(() => {
          reject(new Error('Razorpay script load timeout'));
        }, this.LOAD_TIMEOUT);

        script.addEventListener('load', () => clearTimeout(timeout));

        document.body.appendChild(script);
      });
    }
    return this.instance;
  }
}