import React from 'react';
import { usePayment } from '../../hooks/usePayment';
import { RAZORPAY_CONFIG } from '../../services/payments/razorpay/config';

interface PaymentButtonProps {}

export function PaymentButton({}: PaymentButtonProps) {
  const { loading, error, attemptsLeft, hasPaid, checkAndProcessAnalysis } = usePayment();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 border-2 border-black rounded-lg">
        <div>
          <h3 className="font-bold text-gray-900">Analysis Credits</h3>
          <p className="text-sm text-gray-600">
            {hasPaid ? `Premium Access (${RAZORPAY_CONFIG.PAID_ATTEMPTS} attempts)` : 'Free Tier (1 attempt)'}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-900">{attemptsLeft} attempts remaining</p>
          {!hasPaid && attemptsLeft < 1 && (
            <button
              onClick={() => checkAndProcessAnalysis()}
              disabled={loading}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg
                       border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                       hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                       transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Get 3 Premium Credits (₹500)'}
            </button>
          )}
        </div>
      </div>
      
      {error && (
        <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
}