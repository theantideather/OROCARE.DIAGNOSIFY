export interface CrossmintConfig {
  apiKey: string;
  environment: 'staging' | 'production';
}

export interface WalletCreationParams {
  email: string;
  type: 'solana-custodial-wallet';
}

export interface CrossmintResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface CrossmintWallet {
  id: string;
  address: string;
  type: string;
  linkedUser: string;
}