import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface Message {
  id: string;
  content: string;
  username: string;
  imageUrl?: string;
  timestamp: number;
}

export function CommunityChat() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chat_messages');
    return saved ? JSON.parse(saved) : [];
  });
  const [username] = useState(() => 
    `trader_${Math.random().toString(36).substring(2, 8)}`
  );

  useEffect(() => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = (content: string, imageUrl?: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substring(2),
      content,
      username,
      imageUrl,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="p-4 border-b-2 border-black flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-red-600" />
        <h2 className="text-xl font-bold text-gray-900">Traders Community</h2>
      </div>

      <div className="h-[400px] overflow-y-auto p-4">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}