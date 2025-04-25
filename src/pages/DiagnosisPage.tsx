import React, { useState } from 'react';
import AnalysisSteps from '../components/UI/AnalysisSteps';

type DiagnosisType = 'xray' | 'oral' | 'orthodontic';

const DiagnosisPage: React.FC = () => {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<DiagnosisType>('xray');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<string | null>(null);

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setResults(null);
    
    // Simulate analysis completion after steps finish (about 8-9 seconds)
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults(`AI ${selectedDiagnosis} analysis complete. We've detected potential issues that require professional attention.`);
    }, 9000);
  };

  return (
    <div className="app-container">
      <div className="glass-card">
        <h1 className="header-gradient">OrocareAI Diagnosis</h1>
        
        <div className="diagnosis-selector">
          <h2>Select Analysis Type</h2>
          <div className="diagnosis-options">
            <button 
              className={`diagnosis-option ${selectedDiagnosis === 'xray' ? 'selected' : ''}`}
              onClick={() => setSelectedDiagnosis('xray')}
            >
              X-Ray Analysis
            </button>
            <button 
              className={`diagnosis-option ${selectedDiagnosis === 'oral' ? 'selected' : ''}`}
              onClick={() => setSelectedDiagnosis('oral')}
            >
              Oral Health Analysis
            </button>
            <button 
              className={`diagnosis-option ${selectedDiagnosis === 'orthodontic' ? 'selected' : ''}`}
              onClick={() => setSelectedDiagnosis('orthodontic')}
            >
              Orthodontic Analysis
            </button>
          </div>
          
          <div className="upload-container">
            <p>Upload your {selectedDiagnosis === 'xray' ? 'X-Ray' : selectedDiagnosis === 'oral' ? 'oral cavity photos' : 'orthodontic records'}</p>
            <button className="premium-button">Select Files</button>
          </div>
          
          <button 
            className="premium-button analyze-button"
            onClick={handleStartAnalysis}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
          </button>
        </div>
        
        {isAnalyzing && (
          <div className="analysis-container">
            <h3>Analysis in Progress</h3>
            <AnalysisSteps diagnosisType={selectedDiagnosis} />
          </div>
        )}
        
        {results && (
          <div className="results-container glass-card">
            <h3>Analysis Results</h3>
            <p>{results}</p>
            <button className="premium-button">Schedule Appointment</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosisPage; 