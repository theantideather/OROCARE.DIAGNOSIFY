export interface PaymentConfig {
  keyId: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
}

export interface PaymentOptions extends PaymentConfig {
  handler: (response: PaymentResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color: string;
  };
}

export interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface PaymentResult {
  success: boolean;
  error?: string;
  transactionId?: string;
}