export interface BybitCredentials {
  apiKey: string;
  apiSecret: string;
}

export interface BybitOrder {
  symbol: string;
  side: 'Buy' | 'Sell';
  orderType: 'Market' | 'Limit';
  qty: string;
  price?: string;
  timeInForce?: 'GTC' | 'IOC' | 'FOK';
}

export interface BybitResponse {
  success: boolean;
  orderId?: string;
  error?: string;
}