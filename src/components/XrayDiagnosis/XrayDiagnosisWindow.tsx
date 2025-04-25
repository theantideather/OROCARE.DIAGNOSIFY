import React, { useState } from 'react';
import { Tooth, Upload, Camera, X, Search, AlertTriangle, FileText, Clipboard } from 'lucide-react';
import { DentalAnalysis, DiagnosisType } from '../../types/dental';

export function XrayDiagnosisWindow() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DentalAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [diagnosisType, setDiagnosisType] = useState<DiagnosisType>('xray');
  const [analysisStage, setAnalysisStage] = useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Analysis stages for entertainment
  const analysisStages = [
    'Initializing OrocareAI RLM...',
    'Loading advanced dental patterns...',
    'Calibrating high-resolution scan mode...',
    'Analyzing image clarity and orientation...',
    'Enhancing image contrast...',
    'Scanning for anomalies in dental structures...',
    'Detecting enamel patterns and integrity...',
    'Zooming into detailed structure analysis...',
    'Analyzing root structures and nerve pathways...',
    'Examining gray scale densities in X-ray...',
    'Identifying potential cavities and lesions...',
    'Measuring bone density and periodontal health...',
    'Comparing with dental health database...',
    'Running AI diagnostics on dental patterns...',
    'Generating comprehensive diagnosis...',
    'Preparing personalized treatment recommendations...',
    'Finalizing analysis report...'
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // Camera capture would be implemented here with device camera access
    alert("Camera functionality would be integrated with device camera");
  };

  const clearImage = () => {
    setImage(null);
    setDiagnosisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeDentalImage = () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    
    // Cycle through analysis stages for entertainment
    let stageIndex = 0;
    const stageInterval = setInterval(() => {
      setAnalysisStage(analysisStages[stageIndex]);
      stageIndex++;
      if (stageIndex >= analysisStages.length) {
        clearInterval(stageInterval);
      }
    }, 1200);
    
    // Simulate API call to OrocareAI for analysis
    setTimeout(() => {
      // Simulated response based on diagnosis type
      let result: DentalAnalysis;
      
      if (diagnosisType === 'xray') {
        result = {
          overallHealth: 'fair',
          confidence: 87,
          findings: [
            {
              type: 'cavity',
              location: 'Upper right molar (18)',
              severity: 'moderate',
              description: 'Visible decay in the occlusal surface extending to dentin.'
            },
            {
              type: 'fracture',
              location: 'Lower left incisor (32)',
              severity: 'mild',
              description: 'Hairline fracture visible on the enamel surface.'
            }
          ],
          teethAnalysis: {
            missingTeeth: ['17', '31'],
            cavities: ['18', '25'],
            fractures: ['32'],
            infections: [],
            restorations: ['14', '15', '46']
          },
          recommendations: [
            {
              procedure: 'Filling',
              urgency: 'soon',
              location: 'Upper right molar (18)',
              notes: 'Composite filling recommended to prevent further decay.'
            },
            {
              procedure: 'Monitoring',
              urgency: 'routine',
              location: 'Lower left incisor (32)',
              notes: 'Monitor fracture during regular checkups.'
            }
          ],
          additionalNotes: 'Overall dental hygiene appears adequate, but increased attention to the upper right quadrant is recommended.'
        };
      } else if (diagnosisType === 'oral') {
        result = {
          overallHealth: 'good',
          confidence: 82,
          findings: [
            {
              type: 'gingivitis',
              location: 'Upper gum line',
              severity: 'mild',
              description: 'Slight inflammation of the gingival tissue.'
            }
          ],
          recommendations: [
            {
              procedure: 'Improved flossing regimen',
              urgency: 'routine',
              location: 'Full mouth',
              notes: 'Daily flossing recommended to reduce gingival inflammation.'
            }
          ],
          additionalNotes: 'Oral tissues appear generally healthy with minor inflammation.'
        };
      } else {
        result = {
          overallHealth: 'fair',
          confidence: 75,
          findings: [
            {
              type: 'misalignment',
              location: 'Lower arch',
              severity: 'moderate',
              description: 'Moderate crowding of anterior teeth.'
            }
          ],
          recommendations: [
            {
              procedure: 'Orthodontic consultation',
              urgency: 'routine',
              location: 'Full mouth',
              notes: 'Evaluation for potential alignment correction recommended.'
            }
          ],
          additionalNotes: 'Potential candidate for minor orthodontic intervention.'
        };
      }
      
      setDiagnosisResult(result);
      setIsAnalyzing(false);
      clearInterval(stageInterval);
      setAnalysisStage('');
    }, 20000); // Longer analysis time for better user experience
  };

  return (
    <div className="mac-window max-w-4xl mx-auto">
      {/* Macintosh Style Header */}
      <div className="mac-header">
        <div className="mac-title-bar">
          <div className="mac-btn mac-btn-close"></div>
          <div className="mac-btn mac-btn-minimize"></div>
          <div className="mac-btn mac-btn-maximize"></div>
          <h2 className="text-xl font-bold ml-4 text-gray-800 flex items-center">
            <Tooth className="mr-2" /> Dental Diagnosis Interface
          </h2>
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
          <span className="flex items-center">
            <Upload size={18} className="mr-2" /> Upload Image
          </span>
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'camera' ? 'font-bold border-b-2 border-purple-600' : ''}`}
          onClick={() => setActiveTab('camera')}
        >
          <span className="flex items-center">
            <Camera size={18} className="mr-2" /> Capture Image
          </span>
        </button>
      </div>

      {/* Content area */}
      <div className="p-6 bg-white/90 backdrop-blur">
        {activeTab === 'upload' && (
          <div className="text-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 glassmorphism">
              {!image ? (
                <div>
                  <Tooth size={48} className="mx-auto text-gray-400 mb-4" />
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
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {image && !isAnalyzing && !diagnosisResult && (
              <button
                onClick={analyzeDentalImage}
                className="arc-gradient-3 text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition shadow-lg flex items-center mx-auto"
              >
                <Search size={20} className="mr-2" /> Analyze {diagnosisType === 'xray' ? 'X-Ray' : 'Image'}
              </button>
            )}

            {isAnalyzing && (
              <div className="text-center p-4 glassmorphism rounded-lg shadow-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-3"></div>
                <p className="text-gray-600 font-medium">{analysisStage || 'Initializing analysis...'}</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
                  <div className="arc-gradient-2 h-1.5 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'camera' && (
          <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg glassmorphism">
            <Camera size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4">Capture a dental {diagnosisType === 'xray' ? 'X-ray' : 'image'} using your device camera</p>
            <button
              onClick={handleCameraCapture}
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
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <FileText className="mr-2 text-purple-600" /> Diagnosis Results
              </h3>
              <span className={`px-3 py-1 rounded-full text-sm ${
                diagnosisResult.overallHealth === 'good' ? 'bg-green-100 text-green-800' :
                diagnosisResult.overallHealth === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                Overall: {diagnosisResult.overallHealth.charAt(0).toUpperCase() + diagnosisResult.overallHealth.slice(1)}
              </span>
            </div>

            <div className="bg-gray-50/80 p-4 rounded-lg mb-4 glassmorphism">
              <h4 className="font-bold text-gray-700 mb-2">Findings:</h4>
              {diagnosisResult.findings.length === 0 ? (
                <p className="text-gray-500">No significant findings detected.</p>
              ) : (
                <div className="space-y-3">
                  {diagnosisResult.findings.map((finding, i) => (
                    <div key={i} className="bg-white/80 p-3 rounded-lg border glassmorphism">
                      <div className="flex justify-between">
                        <span className="font-medium">{finding.type.charAt(0).toUpperCase() + finding.type.slice(1)}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          finding.severity === 'mild' ? 'bg-green-100 text-green-800' :
                          finding.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {finding.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Location: {finding.location}</p>
                      <p className="text-sm text-gray-600 mt-1">{finding.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {diagnosisType === 'xray' && diagnosisResult.teethAnalysis && (
              <div className="bg-gray-50/80 p-4 rounded-lg mb-4 glassmorphism">
                <h4 className="font-bold text-gray-700 mb-2">Teeth Analysis:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(diagnosisResult.teethAnalysis).map(([key, value], i) => (
                    <div key={i} className="bg-white/80 p-3 rounded-lg border glassmorphism">
                      <h5 className="font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h5>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {value.length === 0 ? (
                          <span className="text-gray-400 text-sm">None</span>
                        ) : (
                          value.map((item, j) => (
                            <span key={j} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                              {item}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-50/80 p-4 rounded-lg mb-4 glassmorphism">
              <h4 className="font-bold text-gray-700 mb-2">Recommendations:</h4>
              {diagnosisResult.recommendations.length === 0 ? (
                <p className="text-gray-500">No specific recommendations at this time.</p>
              ) : (
                <div className="space-y-3">
                  {diagnosisResult.recommendations.map((rec, i) => (
                    <div key={i} className="bg-white/80 p-3 rounded-lg border-l-4 border-l-purple-500 glassmorphism">
                      <div className="flex justify-between">
                        <span className="font-medium">{rec.procedure}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          rec.urgency === 'routine' ? 'bg-green-100 text-green-800' :
                          rec.urgency === 'soon' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {rec.urgency}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Location: {rec.location}</p>
                      <p className="text-sm text-gray-600 mt-1">{rec.notes}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {diagnosisResult.additionalNotes && (
              <div className="bg-gray-50/80 p-4 rounded-lg mb-4 glassmorphism">
                <h4 className="font-bold text-gray-700 mb-2">Additional Notes:</h4>
                <p className="text-gray-600">{diagnosisResult.additionalNotes}</p>
              </div>
            )}

            <div className="text-center mt-6">
              <button
                className="arc-gradient-2 text-white px-4 py-2 rounded-full shadow-lg hover:opacity-90 transition flex items-center mx-auto mb-2"
                onClick={() => window.print()}
              >
                <Clipboard size={18} className="mr-2" /> Save Report
              </button>
              <p className="text-sm text-gray-500">
                Confidence rating: {diagnosisResult.confidence}%. This analysis is provided for informational purposes only and should be reviewed by a dental professional.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer with disclaimer */}
      <div className="bg-yellow-50/90 p-4 border-t border-yellow-100 backdrop-blur">
        <div className="flex items-start">
          <AlertTriangle className="text-yellow-500 mr-2 flex-shrink-0 mt-1" size={20} />
          <p className="text-sm text-yellow-700">
            <strong>Important:</strong> This AI-powered tool provides preliminary analysis only. Always consult with a qualified dental professional for accurate diagnosis and treatment planning.
          </p>
        </div>
      </div>
    </div>
  );
} 