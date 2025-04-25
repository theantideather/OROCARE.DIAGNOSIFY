import { RAZORPAY_CONFIG } from './config';
import { RazorpayLoader } from './razorpayLoader';
import { UsageTracker } from '../usage/usageTracker';

export class RazorpayService {
  static async initialize(): Promise<void> {
    try {
      if (!RAZORPAY_CONFIG.KEY_ID) {
        throw new Error(RAZORPAY_CONFIG.ERROR_MESSAGES.KEYS_MISSING);
      }

      // Load Razorpay script
      await RazorpayLoader.loadScript();

      // Create payment options
      const options = {
        key: RAZORPAY_CONFIG.KEY_ID,
        amount: RAZORPAY_CONFIG.AMOUNT,
        currency: RAZORPAY_CONFIG.CURRENCY,
        name: RAZORPAY_CONFIG.NAME,
        description: RAZORPAY_CONFIG.DESCRIPTION,
        handler: this.handlePaymentSuccess,
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#dc2626'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error('Payment initialization failed:', error);
      throw new Error(RAZORPAY_CONFIG.ERROR_MESSAGES.INIT_FAILED);
    }
  }

  private static handlePaymentSuccess(response: any): void {
    if (!response.razorpay_payment_id) {
      throw new Error('Invalid payment response');
    }

    // Update local storage
    localStorage.setItem(RAZORPAY_CONFIG.PAYMENT_STATUS_KEY, 'true');
    UsageTracker.resetAttempts();
    
    // Reload page to reflect changes
    window.location.reload();
  }
}