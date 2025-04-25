import React from 'react';

interface AnalysisResultProps {
  diagnosis: string;
  confidence: number;
  recommendations: string[];
}

export function AnalysisResult({ diagnosis, confidence, recommendations }: AnalysisResultProps) {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Analysis Results</h2>
      
      <div className="mb-4">
        <h3 className="font-medium text-gray-700">Diagnosis:</h3>
        <p className="text-gray-700 leading-relaxed">{diagnosis}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-medium text-gray-700">Confidence Level:</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div 
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${confidence}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{confidence}% confidence</p>
      </div>

      <div className="mb-4">
        <h3 className="font-medium text-gray-700">Recommendations:</h3>
        <ul className="list-disc list-inside mt-2 space-y-1">
          {recommendations.map((rec, index) => (
            <li key={index} className="text-gray-700">{rec}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
        <p className="text-sm text-yellow-700">
          Disclaimer: This is an AI-assisted analysis and should not be considered as a replacement for professional medical advice.
          Always consult with a qualified healthcare provider for proper diagnosis and treatment.
        </p>
      </div>
    </div>
  );
}