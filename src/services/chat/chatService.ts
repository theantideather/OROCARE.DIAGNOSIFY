import { supabase } from '../../lib/supabase';
import type { Message, MessageInput } from './types';

class ChatService {
  private messagesTable = 'messages';

  subscribeToMessages(
    onUpdate: (messages: Message[]) => void,
    onError: (error: Error) => void
  ): () => void {
    const channel = supabase
      .channel('messages')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: this.messagesTable },
        payload => {
          this.fetchMessages()
            .then(messages => onUpdate(messages))
            .catch(error => onError(error));
        }
      )
      .subscribe();

    // Initial fetch
    this.fetchMessages()
      .then(messages => onUpdate(messages))
      .catch(error => onError(error));

    return () => {
      supabase.removeChannel(channel);
    };
  }

  private async fetchMessages(): Promise<Message[]> {
    const { data, error } = await supabase
      .from(this.messagesTable)
      .select(`
        id,
        content,
        image_url,
        user_id,
        created_at,
        user:profiles(username, avatar_url)
      `)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data as Message[];
  }

  async sendMessage(input: MessageInput): Promise<void> {
    const { error } = await supabase
      .from(this.messagesTable)
      .insert([{
        content: input.content,
        image_url: input.imageUrl,
        user_id: input.userId,
        created_at: new Date().toISOString()
      }]);

    if (error) throw error;
  }
}

export const chatService = new ChatService();