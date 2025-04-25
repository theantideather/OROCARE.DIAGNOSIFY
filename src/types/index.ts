export interface Message {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  created_at: string;
  user: {
    username: string;
    avatar_url?: string;
  };
}

export * from './dental';