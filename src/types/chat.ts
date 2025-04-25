export interface TradingMessage {
  id: string;
  content: string;
  username: string;
  avatar_url?: string;
  created_at: string;
}

export interface TraderSupportMessage extends TradingMessage {
  trader_id?: string;
  trader?: {
    name: string;
    avatar_url: string;
    expertise: string[];
  };
}