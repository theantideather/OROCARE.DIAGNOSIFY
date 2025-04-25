import { useState } from 'react';
import { PaymentService } from '../services/payments/paymentService';

export function useAnalysisPayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAndProcessAnalysis = async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      // Check if payment is needed BEFORE incrementing attempts
      if (PaymentService.needsPayment()) {
        const result = await PaymentService.initialize();
        if (!result.success) {
          throw new Error(result.error);
        }
        return false;
      }

      // Only increment if we haven't exceeded limits
      if (PaymentService.getRemainingAttempts() > 0) {
        PaymentService.incrementAttempts();
        return true;
      }

      // If we get here, we've exceeded limits
      throw new Error('No analysis attempts remaining. Please upgrade to continue.');
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    checkAndProcessAnalysis,
    loading,
    error,
    attemptsLeft: PaymentService.getRemainingAttempts(),
    hasPaid: PaymentService.getPaymentStatus(),
    maxAttempts: PaymentService.getMaxAttempts()
  };
}