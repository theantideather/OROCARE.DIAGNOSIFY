import { useState, useCallback } from 'react';
import { RazorpayService } from '../services/payments/razorpay/razorpayService';
import { UsageTracker } from '../services/payments/usage/usageTracker';
import { RAZORPAY_CONFIG } from '../services/payments/razorpay/config';

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAndProcessAnalysis = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      if (UsageTracker.needsPayment()) {
        await RazorpayService.initialize();
        setError(RAZORPAY_CONFIG.ERROR_MESSAGES.PAYMENT_REQUIRED);
        return false;
      }

      UsageTracker.incrementAttempts();
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    checkAndProcessAnalysis,
    loading,
    error,
    attemptsLeft: UsageTracker.getRemainingAttempts(),
    hasPaid: UsageTracker.hasPaid(),
    maxAttempts: RAZORPAY_CONFIG.MAX_FREE_ATTEMPTS
  };
}