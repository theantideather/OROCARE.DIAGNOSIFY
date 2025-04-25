import React, { useState } from 'react';
import { Mail, Loader } from 'lucide-react';
import { CrossmintService } from '../../services/wallet/crossmint/crossmintService';

export function CrossmintConnect() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleConnect = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await CrossmintService.createCustodialWallet(email);
      
      if (result.success) {
        setSuccess(true);
        setEmail('');
      } else {
        setError(result.error || 'Failed to create wallet');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-3 py-2 border-2 border-black rounded-lg"
            placeholder="Enter your email"
            disabled={loading}
          />
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border-2 border-green-200 rounded-lg text-sm text-green-600">
          Custodial wallet created successfully! Check your email for details.
        </div>
      )}

      <button
        onClick={handleConnect}
        disabled={!email || loading}
        className="w-full bg-red-600 text-white px-4 py-3 rounded-lg
                 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                 active:translate-x-1 active:translate-y-1
                 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                 transition-all flex items-center justify-center gap-2
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Creating Wallet...
          </>
        ) : (
          'Create Custodial Wallet'
        )}
      </button>
    </div>
  );
}