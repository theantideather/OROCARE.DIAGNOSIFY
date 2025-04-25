import React, { useState } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';
import { BybitWallet } from '../../services/trading/bybit/bybitWallet';

export function BybitConnect() {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = () => {
    try {
      BybitWallet.connect(apiKey, apiSecret);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDisconnect = () => {
    BybitWallet.disconnect();
    setApiKey('');
    setApiSecret('');
    setError(null);
  };

  if (BybitWallet.isConnected()) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-green-600 font-medium">Connected to Bybit</span>
        <button
          onClick={handleDisconnect}
          className="px-4 py-2 bg-red-600 text-white rounded-lg
                   hover:bg-red-700 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          API Key
        </label>
        <div className="flex items-center gap-2">
          <Key className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 
                     focus:ring-blue-500 outline-none"
            placeholder="Enter your Bybit API key"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          API Secret
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSecret(!showSecret)}
            className="text-gray-400 hover:text-gray-600"
          >
            {showSecret ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
          <input
            type={showSecret ? 'text' : 'password'}
            value={apiSecret}
            onChange={(e) => setApiSecret(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 
                     focus:ring-blue-500 outline-none"
            placeholder="Enter your Bybit API secret"
          />
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <button
        onClick={handleConnect}
        disabled={!apiKey || !apiSecret}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg
                 hover:bg-blue-700 transition-colors disabled:opacity-50
                 disabled:cursor-not-allowed"
      >
        Connect Bybit Account
      </button>
    </div>
  );
}