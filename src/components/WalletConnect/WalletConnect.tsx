```tsx
import React, { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';
import { PhantomWallet } from '../../services/wallet/phantomWallet';

export function WalletConnect() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    // Check if already connected
    if (PhantomWallet.isConnected()) {
      setPublicKey(PhantomWallet.getPublicKey()?.toString() || null);
    }
  }, []);

  const handleConnect = async () => {
    try {
      setConnecting(true);
      const key = await PhantomWallet.connect();
      setPublicKey(key);
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    await PhantomWallet.disconnect();
    setPublicKey(null);
  };

  return (
    <button
      onClick={publicKey ? handleDisconnect : handleConnect}
      disabled={connecting}
      className="bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg
               border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
               hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
               active:translate-x-0.5 active:translate-y-0.5
               active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
               transition-all text-sm sm:text-base flex items-center gap-2
               disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="hidden sm:inline">
        {connecting ? 'Connecting...' : 
         publicKey ? `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}` : 
         'Connect Wallet'}
      </span>
      <span className="sm:hidden">
        {connecting ? '...' :
         publicKey ? `${publicKey.slice(0, 4)}...` :
         'Connect'}
      </span>
    </button>
  );
}
```