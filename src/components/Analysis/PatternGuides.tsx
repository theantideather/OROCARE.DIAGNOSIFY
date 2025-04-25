import React from 'react';
import { Info } from 'lucide-react';

const PATTERN_GUIDES = {
  bullish: [
    {
      name: 'Bull Flag',
      image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=300&h=200',
      description: 'A consolidation pattern showing a downward sloping channel after a strong upward move. Suggests continuation of the uptrend.',
      characteristics: [
        'Strong upward move (flag pole)',
        'Parallel downward channel (flag)',
        'Lower volume during consolidation'
      ]
    },
    {
      name: 'Ascending Triangle',
      image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=300&h=200',
      description: 'A continuation pattern with a flat upper resistance line and rising lower support line. Indicates bullish momentum.',
      characteristics: [
        'Horizontal resistance line',
        'Rising support line',
        'Decreasing volume before breakout'
      ]
    }
  ],
  bearish: [
    {
      name: 'Head and Shoulders',
      image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=300&h=200',
      description: 'A reversal pattern with three peaks, the middle being highest. Signals potential trend reversal from bullish to bearish.',
      characteristics: [
        'Left shoulder, head, right shoulder',
        'Neckline support',
        'Volume typically highest at left shoulder'
      ]
    }
  ],
  neutral: [
    {
      name: 'Symmetrical Triangle',
      image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=300&h=200',
      description: 'A consolidation pattern with converging support and resistance lines. Can break in either direction.',
      characteristics: [
        'Converging trendlines',
        'Equal slopes',
        'Decreasing volume as pattern forms'
      ]
    }
  ]
};

interface PatternGuidesProps {
  selectedPattern?: string;
}

export function PatternGuides({ selectedPattern }: PatternGuidesProps) {
  const [activePattern, setActivePattern] = React.useState<string | null>(null);

  const allPatterns = [
    ...PATTERN_GUIDES.bullish,
    ...PATTERN_GUIDES.bearish,
    ...PATTERN_GUIDES.neutral
  ];

  const currentPattern = allPatterns.find(p => p.name === (selectedPattern || activePattern));

  return (
    <div className="border-2 border-black rounded-lg p-4 bg-gray-50 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-6 h-6 text-red-600" />
        <h3 className="font-bold text-gray-900">Pattern Recognition Guide</h3>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {allPatterns.map((pattern) => (
          <button
            key={pattern.name}
            onClick={() => setActivePattern(pattern.name)}
            className={`px-3 py-1 rounded text-sm font-bold border-2 border-black
                     transition-all ${pattern.name === (selectedPattern || activePattern)
              ? 'bg-red-600 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
              : 'bg-white text-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            } hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
          >
            {pattern.name}
          </button>
        ))}
      </div>

      {currentPattern && (
        <div className="border-2 border-black rounded-lg p-4 bg-white">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <img
                src={currentPattern.image}
                alt={currentPattern.name}
                className="w-full rounded-lg border-2 border-black mb-2"
              />
              <p className="text-sm text-gray-600 italic">
                Example of {currentPattern.name} pattern
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-2">{currentPattern.name}</h4>
              <p className="text-gray-700 mb-4">{currentPattern.description}</p>
              
              <h5 className="font-bold text-gray-900 mb-2">Key Characteristics:</h5>
              <ul className="space-y-1">
                {currentPattern.characteristics.map((char, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                    {char}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}