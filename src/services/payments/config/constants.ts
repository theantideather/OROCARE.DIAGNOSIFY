export const PAYMENT_CONFIG = {
  AMOUNT: 50000, // ₹500 in paise
  CURRENCY: 'INR',
  NAME: 'PreBulls Analysis',
  DESCRIPTION: 'Premium Chart Analysis Access',
  THEME_COLOR: '#dc2626',
  STORAGE_KEYS: {
    PAYMENT_STATUS: 'payment_status',
    ATTEMPTS: 'analysis_attempts'
  },
  LIMITS: {
    FREE_ATTEMPTS: 1, // Restricted to 1 free attempt
    PAID_ATTEMPTS: 3  // 3 attempts after payment
  }
} as const;