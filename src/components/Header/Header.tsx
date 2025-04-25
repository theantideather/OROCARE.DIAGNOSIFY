import React from 'react';
import { Scan, Stethoscope, Brain, Shield } from 'lucide-react';
import { VoiceChat } from '../VoiceChat';

export function Header() {
  return (
    <header className="bg-gradient-to-b from-tiffany-50 to-offwhite pt-8 pb-4">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-tiffany-500 p-4 rounded-xl border-4 border-black
                          shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                          animate-pulse">
              <Scan className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-black text-pine-800">OroCare AI</h1>
          </div>
          
          <p className="text-xl text-pine-700 mb-8 font-medium">
            Advanced AI-powered dental and skin condition diagnostics
          </p>

          <VoiceChat />

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border-4 border-black rounded-xl p-6
                         shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                         hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
                         transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="bg-tiffany-100 p-3 rounded-full">
                  <Stethoscope className="w-8 h-8 text-tiffany-500" />
                </div>
              </div>
              <h3 className="font-bold text-pine-800 mb-2">Instant Analysis</h3>
              <p className="text-pine-700 text-sm">
                Quick and accurate AI-powered diagnosis
              </p>
            </div>

            <div className="bg-white border-4 border-black rounded-xl p-6
                         shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                         hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
                         transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="bg-tiffany-100 p-3 rounded-full">
                  <Brain className="w-8 h-8 text-tiffany-500" />
                </div>
              </div>
              <h3 className="font-bold text-pine-800 mb-2">Smart Detection</h3>
              <p className="text-pine-700 text-sm">
                Advanced pattern recognition technology
              </p>
            </div>

            <div className="bg-white border-4 border-black rounded-xl p-6
                         shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                         hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
                         transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="bg-tiffany-100 p-3 rounded-full">
                  <Shield className="w-8 h-8 text-tiffany-500" />
                </div>
              </div>
              <h3 className="font-bold text-pine-800 mb-2">Trusted Results</h3>
              <p className="text-pine-700 text-sm">
                Reliable medical insights and recommendations
              </p>
            </div>
          </div>

          <div className="bg-white border-4 border-black rounded-xl p-6
                       shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=200&h=200" 
                alt="Medical Analysis" 
                className="w-24 h-24 rounded-full border-4 border-black object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&w=200&h=200" 
                alt="Dental Care" 
                className="w-24 h-24 rounded-full border-4 border-black object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&h=200" 
                alt="Skin Care" 
                className="w-24 h-24 rounded-full border-4 border-black object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-pine-800 mb-4">
              Instant Medical Analysis
            </h2>
            <p className="text-pine-700 leading-relaxed">
              Upload or capture an image of your dental or skin condition for immediate AI-powered analysis.
              Get instant insights and recommendations from our advanced medical AI.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}