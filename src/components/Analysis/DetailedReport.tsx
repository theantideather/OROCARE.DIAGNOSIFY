import React from 'react';
import { Clock, AlertTriangle, ThermometerSun } from 'lucide-react';
import { ConditionAnalysis } from '../../types';

interface DetailedReportProps {
  analysis: ConditionAnalysis;
}

export function DetailedReport({ analysis }: DetailedReportProps) {
  const captureDate = analysis.captureDate || new Date().toLocaleString();
  const severityScore = analysis.severityScore || getSeverityScore(analysis.severity);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Detailed Analysis Report</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Capture Date & Time</h3>
            <p className="text-gray-800 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {captureDate}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Affected Area</h3>
            <p className="text-gray-800">{analysis.affectedArea || 'Area not specified'}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Severity Level</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${getSeverityColor(analysis.severity)}`}
                    style={{ width: `${severityScore * 20}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-medium">{severityScore}/5</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Primary Symptoms</h3>
            <ul className="list-disc list-inside text-gray-800">
              {(analysis.primarySymptoms || ['Symptoms not specified']).map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Possible Conditions</h3>
            <div className="space-y-2">
              {(analysis.possibleConditions || [{
                name: analysis.diagnosis,
                confidence: analysis.confidence
              }]).map((condition, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-800">{condition.name}</span>
                  <span className="text-sm font-medium text-gray-500">
                    {condition.confidence}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2 mb-2">
          <ThermometerSun className="w-5 h-5 text-orange-500" />
          <h3 className="font-medium text-gray-800">Treatment Urgency</h3>
        </div>
        <div className={`p-4 rounded-lg ${getUrgencyColor(analysis.treatmentUrgency)}`}>
          {analysis.treatmentUrgency || 'Schedule consultation based on severity'}
        </div>
      </div>

      {analysis.severity === 'high' && (
        <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <p className="text-red-700 font-medium">
              High severity detected. Immediate medical attention recommended.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function getSeverityScore(severity: 'low' | 'medium' | 'high'): number {
  switch (severity) {
    case 'low': return 2;
    case 'medium': return 3;
    case 'high': return 5;
    default: return 3;
  }
}

function getSeverityColor(severity: 'low' | 'medium' | 'high'): string {
  switch (severity) {
    case 'low': return 'bg-green-500';
    case 'medium': return 'bg-yellow-500';
    case 'high': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
}

function getUrgencyColor(urgency?: string): string {
  if (!urgency) return 'bg-gray-100 text-gray-800';
  if (urgency.includes('24h')) return 'bg-red-100 text-red-800';
  if (urgency.includes('48h')) return 'bg-orange-100 text-orange-800';
  if (urgency.includes('7 days')) return 'bg-yellow-100 text-yellow-800';
  return 'bg-green-100 text-green-800';
}