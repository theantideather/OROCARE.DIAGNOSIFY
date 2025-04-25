import React, { createContext, useContext, useState, useEffect } from 'react';
import { firebaseService } from '../services/firebase/firebaseService';
import { chatService } from '../services/chat/chatService';
import type { Message } from '../types';

interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string, imageUrl?: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = chatService.subscribeToMessages((newMessages) => {
      setMessages(newMessages);
      setLoading(false);
    }, (err) => {
      console.error('Error loading messages:', err);
      setError('Failed to load messages');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (content: string, imageUrl?: string) => {
    try {
      const user = firebaseService.getCurrentUser();
      if (!user) {
        throw new Error('Please sign in to send messages');
      }

      await chatService.sendMessage({
        content,
        imageUrl,
        userId: user.uid,
        username: user.displayName || user.email?.split('@')[0] || 'Anonymous',
        avatarUrl: user.photoURL
      });
    } catch (err: any) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to send message');
      throw err;
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, loading, error }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}