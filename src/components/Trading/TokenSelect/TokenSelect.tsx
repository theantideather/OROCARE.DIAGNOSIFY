```tsx
import React, { useState, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { JupiterTokenService } from '../../../services/trading/jupiter/jupiterTokenService';
import type { Token } from '../../../services/trading/types';

interface TokenSelectProps {
  value: Token;
  onChange: (token: Token) => void;
  label: string;
}

export function TokenSelect({ value, onChange, label }: TokenSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTokens = async () => {
    try {
      setLoading(true);
      const allTokens = await JupiterTokenService.getTokens();
      setTokens(allTokens);
    } catch (error) {
      console.error('Failed to load tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadTokens();
    }
  }, [isOpen]);

  const handleSearch = async (query: string) => {
    setSearch(query);
    if (query.length > 0) {
      const results = await JupiterTokenService.searchTokens(query);
      setTokens(results);
    } else {
      loadTokens();
    }
  };

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border-2 border-black rounded-lg bg-white
                 flex items-center justify-between gap-2 min-h-[42px]"
        type="button"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {value.logoURI && (
            <img 
              src={value.logoURI} 
              alt={value.symbol}
              className="w-6 h-6 rounded-full flex-shrink-0"
            />
          )}
          <span className="truncate">{value.symbol}</span>
        </div>
        <ChevronDown className="w-4 h-4 flex-shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border-2 border-black rounded-lg
                      shadow-lg max-h-[40vh] overflow-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-2">
            <div className="flex items-center gap-2 px-2 py-1 bg-gray-50 rounded">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
                placeholder="Search tokens..."
              />
            </div>
          </div>

          <div className="p-2">
            {loading ? (
              <div className="text-center py-4 text-sm text-gray-500">
                Loading tokens...
              </div>
            ) : tokens.length === 0 ? (
              <div className="text-center py-4 text-sm text-gray-500">
                No tokens found
              </div>
            ) : (
              tokens.map((token) => (
                <button
                  key={token.mint}
                  onClick={() => {
                    onChange(token);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50
                           rounded text-left"
                >
                  {token.logoURI && (
                    <img 
                      src={token.logoURI}
                      alt={token.symbol}
                      className="w-6 h-6 rounded-full flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{token.symbol}</div>
                    <div className="text-xs text-gray-500 truncate">{token.name}</div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
```