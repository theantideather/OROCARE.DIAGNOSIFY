import { supabase } from '../../config/supabase';
import type { Message, MessageInput } from './types';

export class MessageService {
  private static readonly TABLE_NAME = 'messages';

  static async getMessages(): Promise<Message[]> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select(`
        id,
        content,
        image_url,
        user_id,
        created_at,
        user:profiles!user_id(username, avatar_url)
      `)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
    
    return data;
  }

  static async createMessage(input: MessageInput): Promise<void> {
    const { error } = await supabase
      .from(this.TABLE_NAME)
      .insert([{
        content: input.content,
        image_url: input.imageUrl,
        user_id: input.userId
      }]);

    if (error) {
      console.error('Error creating message:', error);
      throw error;
    }
  }

  static subscribeToMessages(
    onUpdate: (messages: Message[]) => void,
    onError: (error: Error) => void
  ): () => void {
    // Initial fetch
    this.getMessages()
      .then(onUpdate)
      .catch(onError);

    // Subscribe to changes
    const channel = supabase
      .channel('messages')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: this.TABLE_NAME },
        () => {
          this.getMessages()
            .then(onUpdate)
            .catch(onError);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
}