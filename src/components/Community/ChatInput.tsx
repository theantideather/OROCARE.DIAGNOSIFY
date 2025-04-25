import React, { useState, useRef } from 'react';
import { Send, Image as ImageIcon } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string, imageUrl?: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !uploading) return;
    onSendMessage(message);
    setMessage('');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        onSendMessage('Shared an image', imageData);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t-2 border-black">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />
      
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
        disabled={uploading}
      >
        <ImageIcon className="w-5 h-5" />
      </button>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        disabled={uploading}
      />

      <button
        type="submit"
        disabled={(!message.trim() && !uploading) || uploading}
        className="p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}