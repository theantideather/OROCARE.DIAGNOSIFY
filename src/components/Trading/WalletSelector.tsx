import React from 'react';
import { Wallet } from 'lucide-react';
import { CrossmintConnect } from '../Wallet/CrossmintConnect';
import { WalletConnect } from '../WalletConnect';

export function WalletSelector() {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-white border-2 border-black rounded-lg">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Wallet className="w-5 h-5 text-red-600" />
          Select Wallet Type
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 border-2 border-black rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Phantom Wallet</h4>
            <p className="text-sm text-gray-600 mb-4">
              Connect your existing Phantom wallet for direct trading access
            </p>
            <WalletConnect />
          </div>

          <div className="p-4 border-2 border-black rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Crossmint Custodial Wallet</h4>
            <p className="text-sm text-gray-600 mb-4">
              Create a new custodial wallet using just your email
            </p>
            <CrossmintConnect />
          </div>
        </div>
      </div>
    </div>
  );
}