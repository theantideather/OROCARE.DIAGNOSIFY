import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { TradingMessage } from '../../../types/chat';

interface ChatMessageProps {
  message: TradingMessage;
  isOwnMessage: boolean;
}

export function ChatMessage({ message, isOwnMessage }: ChatMessageProps) {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] ${isOwnMessage ? 'bg-red-600 text-white' : 'bg-gray-100'} 
                    rounded-lg p-3 space-y-1`}>
        <div className="flex items-center gap-2">
          <img
            src={message.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${message.username}`}
            alt={message.username}
            className="w-6 h-6 rounded-full"
          />
          <span className="font-medium">{message.username}</span>
        </div>
        <p>{message.content}</p>
        <p className="text-xs opacity-75">
          {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}