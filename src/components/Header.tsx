import React from 'react';
import { Beef } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="bg-red-600 p-4 rounded-lg border-2 border-black
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Beef className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-5xl font-black text-white 
                     drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          PreBulls
        </h1>
      </div>
      
      <p className="text-xl text-gray-300 mb-8 font-bold
                  drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
        Retro Trading Analysis
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border-2 border-black rounded-lg p-6
                     shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                     hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                     transition-all duration-200">
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 p-3 rounded-full">
              <Beef className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Pattern Recognition</h3>
          <p className="text-gray-600 text-sm">
            Advanced detection of chart patterns
          </p>
        </div>

        <div className="bg-white border-2 border-black rounded-lg p-6
                     shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                     hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                     transition-all duration-200">
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 p-3 rounded-full">
              <Beef className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Trend Analysis</h3>
          <p className="text-gray-600 text-sm">
            Identify market direction
          </p>
        </div>

        <div className="bg-white border-2 border-black rounded-lg p-6
                     shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                     hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                     transition-all duration-200">
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 p-3 rounded-full">
              <Beef className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Quick Insights</h3>
          <p className="text-gray-600 text-sm">
            Instant support/resistance analysis
          </p>
        </div>
      </div>
    </div>
  );
}