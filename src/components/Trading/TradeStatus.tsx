import React from 'react';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

interface TradeStatusProps {
  status: 'idle' | 'executing' | 'success' | 'error';
  error?: string;
  txId?: string;
}

export function TradeStatus({ status, error, txId }: TradeStatusProps) {
  if (status === 'idle') return null;

  return (
    <div className="mt-4">
      {status === 'executing' && (
        <div className="flex items-center gap-2 text-blue-600">
          <Loader className="w-5 h-5 animate-spin" />
          <span>Executing trade...</span>
        </div>
      )}

      {status === 'success' && (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle className="w-5 h-5" />
          <span>Trade executed successfully!</span>
          {txId && (
            <a 
              href={`https://solscan.io/tx/${txId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline"
            >
              View transaction
            </a>
          )}
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-600">
          <XCircle className="w-5 h-5" />
          <span>{error || 'Trade execution failed'}</span>
        </div>
      )}
    </div>
  );
}