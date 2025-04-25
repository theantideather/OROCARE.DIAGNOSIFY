import { useState } from 'react';
import { analyzeChart } from '../services/analysisService';
import type { ChartAnalysis } from '../types';

export function useChartAnalysis() {
  const [analysis, setAnalysis] = useState<ChartAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = async (imageData: string) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const result = await analyzeChart(imageData);
      setAnalysis(result);
    } catch (err: any) {
      console.error('Analysis failed:', err);
      setError(err.message || 'Failed to analyze image');
      setAnalysis(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    analysis,
    isAnalyzing,
    error,
    analyzeImage
  };
}