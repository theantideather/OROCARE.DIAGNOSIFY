```tsx
import React, { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../hooks/useAuth';
import type { TraderSupportMessage } from '../../../types/chat';

interface TraderSupportChatProps {
  onClose: () => void;
}

export function TraderSupportChat({ onClose }: TraderSupportChatProps) {
  const [messages, setMessages] = useState<TraderSupportMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadMessages();
    subscribeToMessages();
  }, []);

  const loadMessages = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('trader_support_messages')
      .select(`
        *,
        user:profiles(username, avatar_url),
        trader:traders(name, avatar_url, expertise)
      `)
      .or(`user_id.eq.${user.id},trader_id.not.is.null`)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setMessages(data);
    }
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('trader-support')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'trader_support_messages' },
        payload => {
          setMessages(current => [...current, payload.new as TraderSupportMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      const { error } = await supabase
        .from('trader_support_messages')
        .insert([{
          content: newMessage,
          user_id: user.id
        }]);

      if (error) throw error;
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4 border-2 border-black
                    shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="p-4 border-b-2 border-black flex justify-between items-center">
          <h3 className="font-bold text-gray-900">Chat with Professional Trader</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="h-[500px] overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.trader_id ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] ${message.trader_id ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'} 
                            rounded-lg p-3 space-y-1`}>
                <div className="flex items-center gap-2">
                  <img
                    src={message.trader_id ? message.trader.avatar_url : message.user.avatar_url}
                    alt={message.trader_id ? message.trader.name : message.user.username}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="font-medium">
                    {message.trader_id ? message.trader.name : message.user.username}
                  </span>
                </div>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="p-4 border-t-2 border-black flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask your trading question..."
            className="flex-1 px-3 py-2 border-2 border-black rounded-lg"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || !user}
            className="bg-red-600 text-white px-4 py-2 rounded-lg border-2 border-black
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
```