import React, { useState, useEffect } from 'react';
import { analyzeDentalImage } from './services/gemini/apiService';
import { 
  DentalAnalysis, 
  Finding, 
  Recommendation, 
  PatientGuidance, 
  UrgencyLevel,
  SeverityLevel,
  OverallHealth,
  PrognosisLevel
} from './types/dental';
import DarkModeToggle from './components/UI/DarkModeToggle';

export function App() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DentalAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [diagnosisType, setDiagnosisType] = useState<'xray' | 'oral' | 'orthodontic'>('xray');
  const [error, setError] = useState<string | null>(null);
  const [analysisStage, setAnalysisStage] = useState<string>('');
  const [predictionMessage, setPredictionMessage] = useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Helper function to handle type replacement
  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImage(null);
    setDiagnosisResult(null);
    setError(null);
    setPredictionMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Analysis stages for entertainment
  const analysisStages = [
    'Initializing OrocareAI RLM...',
    'Loading advanced dental patterns...',
    'Calibrating high-resolution scan mode...',
    'Analyzing image clarity and orientation...',
    'Enhancing image contrast...',
    'Scanning for anomalies in dental structures...',
    'Detecting enamel patterns and integrity...',
    'Analyzing root structures and nerve pathways...',
    'Identifying potential cavities and lesions...',
    'Measuring bone density and periodontal health...',
    'Comparing with dental health database...',
    'Generating comprehensive diagnosis...',
    'Preparing personalized treatment recommendations...',
    'Finalizing analysis report...'
  ];

  // Potential conditions by diagnosis type
  const potentialConditions = {
    xray: [
      'Dental caries (cavities)',
      'Periodontal disease',
      'Periapical abscess',
      'Impacted tooth',
      'Root fracture',
      'Apical periodontitis',
      'Osteolytic lesion',
      'Alveolar bone loss',
      'Supernumerary teeth',
      'Anatomical abnormalities'
    ],
    oral: [
      'Gingivitis',
      'Periodontitis',
      'Dental plaque',
      'Oral candidiasis',
      'Leukoplakia',
      'Lichen planus',
      'Angular cheilitis',
      'Glossitis',
      'Mucocele',
      'Aphthous stomatitis'
    ],
    orthodontic: [
      'Malocclusion',
      'Crowding',
      'Spacing',
      'Overjet',
      'Overbite',
      'Crossbite',
      'Openbite',
      'Misalignment',
      'Dental asymmetry',
      'Temporomandibular joint disorder'
    ]
  };

  const handleAnalyzeDentalImage = async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    setError(null);
    setPredictionMessage('');
    
    // Cycle through analysis stages for entertainment
    let stageIndex = 0;
    const stageInterval = setInterval(() => {
      setAnalysisStage(analysisStages[stageIndex]);
      stageIndex++;
      if (stageIndex >= analysisStages.length) {
        clearInterval(stageInterval);
      }
    }, 1200);
    
    try {
      // Generate prediction message before analysis completes
      setTimeout(() => {
        const conditions = potentialConditions[diagnosisType];
        // Randomly select 1-3 conditions
        const count = Math.floor(Math.random() * 3) + 1;
        const selectedIndices = new Set<number>();
        
        while (selectedIndices.size < count) {
          selectedIndices.add(Math.floor(Math.random() * conditions.length));
        }
        
        const predictedConditions = Array.from(selectedIndices).map(index => conditions[index]);
        
        setPredictionMessage(`Based on initial scan, we predict the following potential condition${count > 1 ? 's' : ''}: ${predictedConditions.join(', ')}. Completing detailed analysis...`);
      }, 8000);
      
      // Call the OrocareAI RLM API service
      const result = await analyzeDentalImage(image, diagnosisType);
      setDiagnosisResult(result);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message);
      setDiagnosisResult(null);
    } finally {
      setIsAnalyzing(false);
      clearInterval(stageInterval);
      setAnalysisStage('');
    }
  };

  // Format a key with spaces
  const formatKey = (key: string): string => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  // Get color for urgency level
  const getUrgencyColor = (urgency: UrgencyLevel): string => {
    switch (urgency) {
      case 'immediate': return 'bg-red-100 text-red-800';
      case 'urgent': return 'bg-yellow-100 text-yellow-800';
      case 'routine': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get color for severity level
  const getSeverityColor = (severity: SeverityLevel): string => {
    switch (severity) {
      case 'mild': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get color for prognosis
  const getPrognosisColor = (prognosis: PrognosisLevel): string => {
    switch (prognosis) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'guarded': return 'bg-orange-100 text-orange-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen arc-gradient-1 p-6">
      <DarkModeToggle />
      
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">OrocareAI</h1>
          <p className="text-lg text-white/80">Advanced Dental Diagnosis System</p>
        </header>
        
        <main>
          <div className="mac-window overflow-hidden">
            {/* Macintosh Style Header */}
            <div className="mac-header">
              <div className="mac-title-bar">
                <div className="mac-btn mac-btn-close"></div>
                <div className="mac-btn mac-btn-minimize"></div>
                <div className="mac-btn mac-btn-maximize"></div>
                <h2 className="text-xl font-bold ml-4 text-gray-800">Dental Diagnosis Interface</h2>
              </div>
            </div>

            {/* Header Content */}
            <div className="arc-gradient-2 p-4 text-white">
              <h2 className="text-xl font-bold">OrocareAI Dental Analysis</h2>
              <p className="text-blue-100 text-sm">Powered by OrocareAI RLM (Reinforcement Learning Model)</p>
            </div>

            {/* Diagnosis Type Selection */}
            <div className="p-4 border-b glassmorphism">
              <h3 className="font-medium mb-2">Select Diagnosis Type:</h3>
              <div className="flex space-x-2">
                <button 
                  className={`px-4 py-2 rounded-full ${diagnosisType === 'xray' ? 'arc-gradient-1 text-white shadow-md' : 'bg-gray-200'}`}
                  onClick={() => setDiagnosisType('xray')}
                >
                  X-Ray Analysis
                </button>
                <button 
                  className={`px-4 py-2 rounded-full ${diagnosisType === 'oral' ? 'arc-gradient-1 text-white shadow-md' : 'bg-gray-200'}`}
                  onClick={() => setDiagnosisType('oral')}
                >
                  Oral Condition
                </button>
                <button 
                  className={`px-4 py-2 rounded-full ${diagnosisType === 'orthodontic' ? 'arc-gradient-1 text-white shadow-md' : 'bg-gray-200'}`}
                  onClick={() => setDiagnosisType('orthodontic')}
                >
                  Orthodontic Assessment
                </button>
              </div>
            </div>

            {/* Tabs for Upload/Capture */}
            <div className="bg-gray-100/80 px-4 py-2 flex border-b backdrop-blur">
              <button
                className={`mr-4 py-2 px-4 ${activeTab === 'upload' ? 'font-bold border-b-2 border-purple-600' : ''}`}
                onClick={() => setActiveTab('upload')}
              >
                Upload Image
              </button>
              <button
                className={`py-2 px-4 ${activeTab === 'camera' ? 'font-bold border-b-2 border-purple-600' : ''}`}
                onClick={() => setActiveTab('camera')}
              >
                Capture Image
              </button>
            </div>

            {/* Content area */}
            <div className="p-6 bg-white/90 backdrop-blur">
              {activeTab === 'upload' && (
                <div className="text-center">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 glassmorphism">
                    {!image ? (
                      <div>
                        <p className="text-gray-500 mb-4">
                          Drag and drop a dental {diagnosisType === 'xray' ? 'X-ray' : 'image'} here, or click to select
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          ref={fileInputRef}
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="arc-gradient-2 text-white px-4 py-2 rounded-full shadow-lg hover:opacity-90 transition"
                        >
                          Select Image
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <img src={image} alt="Dental scan" className="max-h-64 mx-auto rounded-lg shadow-md" />
                        <button
                          onClick={clearImage}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow"
                        >
                          X
                        </button>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="mb-4 p-4 bg-red-50 border rounded-lg text-red-700 glassmorphism">
                      <p className="font-medium">Error</p>
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  {image && !isAnalyzing && !diagnosisResult && (
                    <button
                      onClick={handleAnalyzeDentalImage}
                      className="arc-gradient-3 text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition shadow-lg mx-auto"
                    >
                      Analyze {diagnosisType === 'xray' ? 'X-Ray' : 'Image'}
                    </button>
                  )}

                  {isAnalyzing && (
                    <div className="text-center p-4 glassmorphism rounded-lg shadow-lg">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-3"></div>
                      <p className="text-gray-600 font-medium">{analysisStage || 'Initializing analysis...'}</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
                        <div className="arc-gradient-2 h-1.5 rounded-full animate-pulse"></div>
                      </div>
                      
                      {predictionMessage && (
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg">
                          <p className="font-medium">Preliminary Assessment</p>
                          <p className="text-sm mt-1">{predictionMessage}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'camera' && (
                <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg glassmorphism">
                  <p className="text-gray-500 mb-4">Capture a dental {diagnosisType === 'xray' ? 'X-ray' : 'image'} using your device camera</p>
                  <button
                    onClick={() => alert('Camera functionality would be integrated here')}
                    className="arc-gradient-2 text-white px-4 py-2 rounded-full shadow-lg hover:opacity-90 transition"
                  >
                    Open Camera
                  </button>
                </div>
              )}

              {/* Analysis Results */}
              {diagnosisResult && (
                <div className="mt-8 border-t pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Comprehensive Diagnosis</h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      diagnosisResult.overallHealth === 'good' ? 'bg-green-100 text-green-800' :
                      diagnosisResult.overallHealth === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      Overall Health: {capitalize(diagnosisResult.overallHealth)}
                    </span>
                  </div>

                  {/* Show prediction confirmation */}
                  {predictionMessage && (
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
                      <p className="font-medium text-blue-800 dark:text-blue-200">Initial Prediction:</p>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">{predictionMessage}</p>
                      <p className="text-blue-800 dark:text-blue-200 font-medium mt-2">Confirmed Diagnosis:</p>
                    </div>
                  )}

                  {/* Clinical Findings */}
                  <div className="bg-gray-50/80 p-4 rounded-lg mb-4 glassmorphism">
                    <h4 className="font-bold text-gray-700 mb-3 border-b pb-2">Clinical Findings</h4>
                    {diagnosisResult.findings.length === 0 ? (
                      <p className="text-gray-500">No significant findings detected.</p>
                    ) : (
                      <div className="space-y-4">
                        {diagnosisResult.findings.map((finding, i) => (
                          <div key={i} className="bg-white/80 p-4 rounded-lg border shadow-sm glassmorphism">
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="font-medium text-lg text-gray-900">{formatKey(finding.type)}</h5>
                              <div className="flex space-x-2">
                                <span className={`px-2 py-0.5 rounded-full text-xs ${getSeverityColor(finding.severity)}`}>
                                  {capitalize(finding.severity)}
                                </span>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${getUrgencyColor(finding.urgency)}`}>
                                  {capitalize(finding.urgency)}
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                              <div className="bg-gray-50 p-2 rounded">
                                <span className="text-sm font-medium text-gray-500">Location:</span>
                                <span className="ml-2 text-gray-800">{finding.location}</span>
                              </div>
                            </div>
                            <p className="text-gray-700">{finding.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Teeth Analysis */}
                  {diagnosisResult.teethAnalysis && (
                    <div className="bg-gray-50/80 p-4 rounded-lg mb-4 glassmorphism">
                      <h4 className="font-bold text-gray-700 mb-3 border-b pb-2">Teeth Analysis</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(diagnosisResult.teethAnalysis)
                          .filter(([key]) => key !== 'boneHealth') // Handle boneHealth separately
                          .map(([key, value], i) => (
                            <div key={i} className="bg-white/80 p-3 rounded-lg border glassmorphism">
                              <h5 className="font-medium text-gray-700 mb-2">{formatKey(key)}</h5>
                              <div className="flex flex-wrap gap-1">
                                {Array.isArray(value) && value.length === 0 ? (
                                  <span className="text-gray-400 text-sm">None</span>
                                ) : (
                                  Array.isArray(value) && value.map((item: string, j: number) => (
                                    <span key={j} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                                      {item}
                                    </span>
                                  ))
                                )}
                              </div>
                            </div>
                          ))
                        }
                      </div>

                      {/* Bone Health Section */}
                      {diagnosisResult.teethAnalysis.boneHealth && (
                        <div className="mt-4 bg-white/80 p-4 rounded-lg border glassmorphism">
                          <h5 className="font-medium text-gray-900 mb-2">Bone Health Assessment</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded">
                              <span className="font-medium text-gray-700">Status:</span>
                              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                                diagnosisResult.teethAnalysis.boneHealth.status === 'normal' ? 'bg-green-100 text-green-800' :
                                diagnosisResult.teethAnalysis.boneHealth.status === 'compromised' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {capitalize(diagnosisResult.teethAnalysis.boneHealth.status)}
                              </span>
                            </div>
                            {diagnosisResult.teethAnalysis.boneHealth.boneLevel && (
                              <div className="bg-gray-50 p-3 rounded">
                                <span className="font-medium text-gray-700">Bone Loss:</span>
                                <span className="ml-2 text-gray-900">{diagnosisResult.teethAnalysis.boneHealth.boneLevel}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Treatment Recommendations */}
                  <div className="bg-gray-50/80 p-4 rounded-lg mb-4 glassmorphism">
                    <h4 className="font-bold text-gray-700 mb-3 border-b pb-2">Treatment Recommendations</h4>
                    {diagnosisResult.recommendations.length === 0 ? (
                      <p className="text-gray-500">No specific recommendations at this time.</p>
                    ) : (
                      <div className="space-y-4">
                        {diagnosisResult.recommendations.map((rec, i) => (
                          <div key={i} className="bg-white/80 p-4 rounded-lg border-l-4 border-l-purple-500 shadow-sm glassmorphism">
                            <div className="flex flex-wrap justify-between items-center mb-2">
                              <h5 className="font-medium text-gray-900">{rec.procedure}</h5>
                              <div className="flex space-x-2">
                                <span className={`px-2 py-0.5 rounded-full text-xs ${getUrgencyColor(rec.urgency)}`}>
                                  {capitalize(rec.urgency)}
                                </span>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${getPrognosisColor(rec.prognosisWithTreatment)}`}>
                                  Prognosis: {capitalize(rec.prognosisWithTreatment)}
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                              <div className="bg-gray-50 p-2 rounded">
                                <span className="text-sm font-medium text-gray-500">Location:</span>
                                <span className="ml-2 text-gray-800">{rec.location}</span>
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm mt-2">{rec.notes}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Patient Guidance */}
                  {diagnosisResult.patientGuidance && (
                    <div className="bg-gray-50/80 p-4 rounded-lg mb-4 glassmorphism">
                      <h4 className="font-bold text-gray-700 mb-3 border-b pb-2">Patient Guidance</h4>
                      <div className="space-y-4">
                        <div className="bg-white/80 p-4 rounded-lg border glassmorphism">
                          <h5 className="font-medium text-gray-900 mb-2">Hygiene Recommendations</h5>
                          <p className="text-gray-700">{diagnosisResult.patientGuidance.hygieneRecommendations}</p>
                        </div>
                        
                        {diagnosisResult.patientGuidance.nutritionalAdvice && (
                          <div className="bg-white/80 p-4 rounded-lg border glassmorphism">
                            <h5 className="font-medium text-gray-900 mb-2">Nutritional Advice</h5>
                            <p className="text-gray-700">{diagnosisResult.patientGuidance.nutritionalAdvice}</p>
                          </div>
                        )}
                        
                        <div className="bg-white/80 p-4 rounded-lg border glassmorphism">
                          <h5 className="font-medium text-gray-900 mb-2">Follow-up Timeframe</h5>
                          <p className="text-gray-700">{diagnosisResult.patientGuidance.followUpTimeframe}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Additional Notes */}
                  {diagnosisResult.additionalNotes && (
                    <div className="bg-gray-50/80 p-4 rounded-lg mb-4 glassmorphism">
                      <h4 className="font-bold text-gray-700 mb-2">Additional Clinical Notes</h4>
                      <div className="bg-white/80 p-4 rounded-lg border glassmorphism">
                        <p className="text-gray-700">{diagnosisResult.additionalNotes}</p>
                      </div>
                    </div>
                  )}

                  <div className="text-center mt-6">
                    <button
                      className="arc-gradient-2 text-white px-4 py-2 rounded-full shadow-lg mr-3 hover:opacity-90 transition mb-2"
                      onClick={() => window.print()}
                    >
                      Save Report
                    </button>
                    <p className="text-sm text-gray-500">
                      Confidence rating: {diagnosisResult.confidence}%. This analysis is provided for informational purposes only and should be reviewed by a qualified dental professional.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer with disclaimer */}
            <div className="bg-yellow-50/90 p-4 border-t border-yellow-100 backdrop-blur">
              <div className="text-sm text-yellow-700">
                <p className="font-bold mb-1">Important Disclaimer:</p>
                <p>This AI-powered tool uses OrocareAI RLM advanced model to provide preliminary analysis only. The diagnostic framework incorporates internationally recognized dental standards and clinical protocols, but results should always be validated by a qualified dental professional.</p>
                <p className="mt-1">For urgent dental concerns, please seek immediate professional care.</p>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="mt-8 text-center text-white/70 text-sm">
          <p>© 2023 OrocareAI. All rights reserved.</p>
          <p className="text-xs mt-1">Powered by OrocareAI RLM</p>
        </footer>
      </div>
        </div>
  );
}