export interface Message {
  id: string;
  content: string;
  image_url?: string;
  user_id: string;
  created_at: string;
  user: {
    username: string;
    avatar_url?: string;
  };
}

export interface MessageInput {
  content: string;
  imageUrl?: string;
  userId: string;
}