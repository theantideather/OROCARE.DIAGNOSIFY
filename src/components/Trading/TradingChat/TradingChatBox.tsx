import React, { useState, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { ChatMessage } from './ChatMessage';
import type { TradingMessage } from '../../../types/chat';

export function TradingChatBox() {
  const [messages, setMessages] = useState<TradingMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Generate random username for anonymous users
    setUsername(`trader_${Math.random().toString(36).substring(2, 8)}`);
    
    // Subscribe to new messages
    const channel = supabase
      .channel('trading-chat')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'trading_messages' },
        payload => {
          setMessages(current => [...current, payload.new as TradingMessage]);
        }
      )
      .subscribe();

    // Load existing messages
    loadMessages();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from('trading_messages')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(50);

    if (!error && data) {
      setMessages(data);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const { error } = await supabase
        .from('trading_messages')
        .insert([{
          content: newMessage,
          username: username,
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
        }]);

      if (error) throw error;
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="border-2 border-black rounded-lg bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="p-4 border-b-2 border-black flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-red-600" />
        <h3 className="font-bold text-gray-900">Trading Chat</h3>
      </div>

      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id}
            message={message}
            isOwnMessage={message.username === username}
          />
        ))}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t-2 border-black flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Share your trading insights..."
          className="flex-1 px-3 py-2 border-2 border-black rounded-lg"
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className="bg-red-600 text-white px-4 py-2 rounded-lg border-2 border-black
                   disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Send
        </button>
      </form>
    </div>
  );
}