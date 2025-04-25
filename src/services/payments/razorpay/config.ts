export const RAZORPAY_CONFIG = {
  KEY_ID: import.meta.env.VITE_RAZORPAY_KEY_ID,
  AMOUNT: 50000, // ₹500.00 (in paise)
  CURRENCY: 'INR',
  NAME: 'PreBulls Analysis',
  DESCRIPTION: '3 Premium Chart Analysis Credits',
  MAX_FREE_ATTEMPTS: 1,
  PAID_ATTEMPTS: 3,
  STORAGE_KEY: 'analysis_attempts',
  PAYMENT_STATUS_KEY: 'payment_status',
  ERROR_MESSAGES: {
    INIT_FAILED: 'Failed to initialize payment. Please try again.',
    KEYS_MISSING: 'Payment system is not properly configured.',
    PAYMENT_REQUIRED: 'Please upgrade to continue analyzing charts.'
  }
} as const;