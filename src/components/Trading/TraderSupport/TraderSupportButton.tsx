```tsx
import React, { useState } from 'react';
import { HeadsetHelp } from 'lucide-react';
import { TraderSupportChat } from './TraderSupportChat';

export function TraderSupportButton() {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowChat(true)}
        className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-full
                 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                 transition-all z-50"
      >
        <HeadsetHelp className="w-6 h-6" />
      </button>

      {showChat && (
        <TraderSupportChat onClose={() => setShowChat(false)} />
      )}
    </>
  );
}
```