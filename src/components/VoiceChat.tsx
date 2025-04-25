import React, { useEffect, useState } from 'react';
import { Mic, X } from 'lucide-react';

export function VoiceChat() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const widget = document.querySelector('elevenlabs-convai');
    if (widget) {
      widget.setAttribute('style', getWidgetStyle(false));
    }
  }, []);

  const getWidgetStyle = (visible: boolean) => {
    return `
      display: ${visible ? 'block' : 'none'};
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      width: 400px;
      max-width: 90vw;
      height: 600px;
      max-height: 80vh;
      border: none;
    `;
  };

  const toggleChat = () => {
    const widget = document.querySelector('elevenlabs-convai');
    if (widget) {
      const newIsOpen = !isOpen;
      widget.setAttribute('style', getWidgetStyle(newIsOpen));
      setIsOpen(newIsOpen);
    }
  };

  return (
    <div className="mb-8">
      <button
        onClick={toggleChat}
        className={`
          bg-gradient-to-r from-blue-600 to-blue-700 
          hover:from-blue-700 hover:to-blue-800 
          text-white px-8 py-4 rounded-lg 
          flex items-center justify-center gap-3 
          mx-auto transition-all duration-200 
          shadow-lg hover:shadow-xl
          ${isOpen ? 'ring-4 ring-blue-200' : ''}
        `}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        <span className="text-lg font-semibold">
          {isOpen ? 'Close Chat' : 'Talk with OroCare AI'}
        </span>
      </button>
    </div>
  );
}