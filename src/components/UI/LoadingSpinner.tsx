import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Analyzing your chart...</p>
    </div>
  );
}