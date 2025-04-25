import React from 'react';
import { AlertTriangle, Clock, ThumbsUp, Stethoscope } from 'lucide-react';
import { DISCLAIMER_TEXT } from '../../utils/constants';

interface AnalysisResultProps {
  diagnosis: string;
  confidence: number;
  recommendations: string[];
  severity: 'low' | 'medium' | 'high';
  followUp: string;
}

const severityColors = {
  low: 'bg-green-50 border-green-200 text-green-700',
  medium: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  high: 'bg-red-50 border-red-200 text-red-700'
};

export function AnalysisResult({ 
  diagnosis, 
  confidence, 
  recommendations, 
  severity,
  followUp 
}: AnalysisResultProps) {
  return (
    <div className="bg-offwhite border-4 border-black rounded-xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Stethoscope className="w-6 h-6 text-tiffany-500" />
          <h2 className="text-2xl font-bold text-pine-800">Analysis Results</h2>
        </div>
        
        <div className="p-4 rounded-xl border-4 border-black mb-4">
          <h3 className="font-bold mb-2 text-pine-800">Diagnosis:</h3>
          <p className="text-lg text-pine-700">{diagnosis}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <ThumbsUp className="w-5 h-5 text-tiffany-500" />
            <h3 className="font-bold text-pine-800">Confidence Level:</h3>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 border-2 border-black">
            <div 
              className="bg-tiffany-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
          <p className="text-sm text-pine-700 mt-1">{confidence}% confidence</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-tiffany-500" />
            <h3 className="font-bold text-pine-800">Follow-up:</h3>
          </div>
          <p className="text-pine-700">{followUp}</p>
        </div>

        <div>
          <h3 className="font-bold text-pine-800 mb-2">Recommendations:</h3>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-pine-700">
                <span className="w-2 h-2 bg-tiffany-500 rounded-full mt-2"></span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 bg-yellow-50 border-4 border-black rounded-xl">
        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-700">{DISCLAIMER_TEXT}</p>
      </div>
    </div>
  );
}