import React, { useEffect, useState } from 'react';
import '../../styles/components/AnalysisSteps.css';

type AnalysisStep = {
  name: string;
  duration: number; // in milliseconds
};

type DiagnosisType = 'xray' | 'oral' | 'orthodontic';

interface AnalysisStepsProps {
  diagnosisType: DiagnosisType;
}

const AnalysisSteps: React.FC<AnalysisStepsProps> = ({ diagnosisType }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<AnalysisStep[]>([]);

  useEffect(() => {
    // Define steps based on diagnosis type
    if (diagnosisType === 'xray') {
      setSteps([
        { name: "Image preprocessing", duration: 1500 },
        { name: "Detecting dental structures", duration: 2000 },
        { name: "Analyzing bone density", duration: 1800 },
        { name: "Identifying abnormalities", duration: 2500 },
        { name: "Generating report", duration: 1200 }
      ]);
    } else if (diagnosisType === 'oral') {
      setSteps([
        { name: "Image processing", duration: 1200 },
        { name: "Tissue analysis", duration: 1800 },
        { name: "Gum health assessment", duration: 2200 },
        { name: "Cavity detection", duration: 2000 },
        { name: "Generating oral health report", duration: 1800 }
      ]);
    } else {
      setSteps([
        { name: "3D model processing", duration: 2000 },
        { name: "Tooth alignment analysis", duration: 1500 },
        { name: "Occlusion evaluation", duration: 2000 },
        { name: "Treatment simulation", duration: 2500 },
        { name: "Generating orthodontic report", duration: 1000 }
      ]);
    }
    
    // Reset current step when diagnosis type changes
    setCurrentStep(0);
  }, [diagnosisType]);

  useEffect(() => {
    // Progress through steps automatically
    if (steps.length === 0 || currentStep >= steps.length) return;
    
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, steps[currentStep].duration);
    
    return () => clearTimeout(timer);
  }, [currentStep, steps]);

  return (
    <div className="analysis-steps">
      {steps.map((step, index) => (
        <p 
          key={index} 
          className={
            index < currentStep ? "completed" : 
            index === currentStep ? "active" : ""
          }
        >
          {step.name}
          {index < currentStep && " ✓"}
          {index === currentStep && <span className="loading-dot">...</span>}
        </p>
      ))}
    </div>
  );
};

export default AnalysisSteps; 