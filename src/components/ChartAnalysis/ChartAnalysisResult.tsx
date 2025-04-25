import React from 'react';
import { ChartAnalysis } from '../../types';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { Bone, AlertTriangle, ArrowRight, CheckCircle, Clock } from 'lucide-react';

interface ChartAnalysisResultProps {
  analysis: ChartAnalysis;
}

export function ChartAnalysisResult({ analysis }: ChartAnalysisResultProps) {
  const getHealthColor = (health: string) => {
    switch (health) {
      case 'good': return 'bg-green-100 text-green-800 border-green-300';
      case 'fair': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'poor': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'immediate': 
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'soon': 
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'routine':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Dental Analysis Results</h2>
        <div className={`px-3 py-1 rounded-full border ${getHealthColor(analysis.overallHealth)}`}>
          Overall: {analysis.overallHealth.charAt(0).toUpperCase() + analysis.overallHealth.slice(1)}
        </div>
      </div>

      {/* Findings */}
      <Card title="Findings" icon={<Bone className="w-5 h-5" />}>
        {analysis.findings.length === 0 ? (
          <p className="text-gray-500">No significant findings detected.</p>
        ) : (
          <div className="space-y-4">
            {analysis.findings.map((finding, index) => (
              <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-semibold flex items-center gap-2">
                    <Badge className={getSeverityColor(finding.severity)}>
                      {finding.severity}
                    </Badge>
                    {finding.type.charAt(0).toUpperCase() + finding.type.slice(1)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {finding.location}
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{finding.description}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Teeth Analysis Summary */}
      <Card title="Teeth Analysis Summary" icon={<Bone className="w-5 h-5" />}>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(analysis.teethAnalysis).map(([key, value]) => (
            <div key={key} className="border rounded-lg p-3">
              <h4 className="font-medium text-gray-900 mb-1">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </h4>
              <div className="flex flex-wrap gap-1">
                {value.length === 0 ? (
                  <span className="text-gray-500 text-sm">None</span>
                ) : (
                  value.map((item, i) => (
                    <Badge key={i} className="bg-gray-100 text-gray-800">
                      {item}
                    </Badge>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations */}
      <Card title="Recommended Treatments" icon={<ArrowRight className="w-5 h-5" />}>
        {analysis.recommendations.length === 0 ? (
          <p className="text-gray-500">No treatments recommended at this time.</p>
        ) : (
          <div className="space-y-3">
            {analysis.recommendations.map((recommendation, index) => (
              <div key={index} className="border-l-4 border-blue-400 pl-3 py-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium flex items-center gap-2">
                    {getUrgencyIcon(recommendation.urgency)}
                    {recommendation.procedure}
                  </h4>
                  <Badge className="bg-blue-100 text-blue-800">
                    {recommendation.location}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700">{recommendation.notes}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Additional Notes */}
      {analysis.additionalNotes && (
        <Card title="Additional Notes">
          <p className="text-gray-700">{analysis.additionalNotes}</p>
        </Card>
      )}

      <div className="text-sm text-center text-gray-400 mt-4">
        Confidence score: {analysis.confidence}% • This analysis is provided as a preliminary assessment and should be confirmed by a dental professional.
      </div>
    </div>
  );
}