export const PAYMENT_ERRORS = {
  INITIALIZATION: 'Failed to initialize payment system',
  INVALID_KEY: 'Payment system is not properly configured',
  SCRIPT_LOAD: 'Failed to load payment script',
  SCRIPT_TIMEOUT: 'Payment script load timeout',
  TRANSACTION: 'Payment transaction failed',
  VALIDATION: 'Invalid payment response'
} as const;