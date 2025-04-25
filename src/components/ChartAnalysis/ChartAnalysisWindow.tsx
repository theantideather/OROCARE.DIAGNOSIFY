import React, { useState } from 'react';
import { ImageCapture } from '../ImageCapture';
import { ImagePreview } from '../ImagePreview';
import { ChartAnalysisResult } from './ChartAnalysisResult';
import { WindowFrame } from '../UI/WindowFrame';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import { PaymentButton } from '../Payment';
import { useChartAnalysis } from '../../hooks/useChartAnalysis';
import { AlertTriangle, Tooth } from 'lucide-react';

export function ChartAnalysisWindow() {
  const [image, setImage] = useState<string | null>(null);
  const { analysis, isAnalyzing, error: analysisError, analyzeImage } = useChartAnalysis();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageData = reader.result as string;
        setImage(imageData);
        analyzeImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <WindowFrame title="Dental X-Ray Analysis">
      <div className="p-6">
        <PaymentButton />

        <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg flex items-start gap-2">
          <Tooth className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-blue-700">
            Upload a dental X-ray image to receive a comprehensive AI-powered diagnosis. 
            Our system can detect cavities, fractures, infections, and more.
          </p>
        </div>

        <ImageCapture
          onImageUpload={handleImageUpload}
          fileInputRef={fileInputRef}
        />

        {image && <ImagePreview imageUrl={image} />}

        {isAnalyzing && <LoadingSpinner />}

        {analysisError && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700">{analysisError}</p>
          </div>
        )}

        {analysis && <ChartAnalysisResult analysis={analysis} />}
      </div>
    </WindowFrame>
  );
}