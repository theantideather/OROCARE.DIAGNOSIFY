import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    username: string;
    imageUrl?: string;
    timestamp: number;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className="mb-4">
      <div className="flex items-start gap-2">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${message.username}`}
          alt={message.username}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1">
          <div className="bg-white p-3 rounded-lg border-2 border-black">
            <p className="font-medium text-gray-900 mb-1">{message.username}</p>
            {message.imageUrl && (
              <img 
                src={message.imageUrl} 
                alt="Shared content"
                className="max-w-full rounded-lg mb-2"
              />
            )}
            <p className="text-gray-700">{message.content}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
}