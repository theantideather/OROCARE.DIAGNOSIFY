import { ConditionAnalysis } from '../../types';

export class AIResponseParser {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  parse(): ConditionAnalysis {
    return {
      diagnosis: this.extractDiagnosis(),
      severity: this.determineSeverity(),
      confidence: this.calculateConfidence(),
      recommendations: this.extractRecommendations(),
      followUp: this.extractFollowUp()
    };
  }

  private extractDiagnosis(): string {
    const diagnosisMatch = this.content.match(/diagnosis:?\s*([^\n\.]+)/i);
    return diagnosisMatch ? diagnosisMatch[1].trim() : 'Unable to determine diagnosis';
  }

  private determineSeverity(): 'low' | 'medium' | 'high' {
    const content_lower = this.content.toLowerCase();
    if (content_lower.includes('severe') || content_lower.includes('high risk')) {
      return 'high';
    } else if (content_lower.includes('mild') || content_lower.includes('low risk')) {
      return 'low';
    }
    return 'medium';
  }

  private calculateConfidence(): number {
    const confidenceMatch = this.content.match(/confidence:?\s*(\d+)/i);
    return confidenceMatch ? Math.min(parseInt(confidenceMatch[1], 10), 100) : 85;
  }

  private extractRecommendations(): string[] {
    const recommendations: string[] = [];
    const lines = this.content.split('\n');
    
    let inRecommendations = false;
    for (const line of lines) {
      if (line.toLowerCase().includes('recommend')) {
        inRecommendations = true;
        continue;
      }
      if (inRecommendations && line.trim().length > 0) {
        recommendations.push(line.trim());
      }
    }
    
    return recommendations.length > 0 ? recommendations : [
      'Consult with a healthcare professional',
      'Monitor the condition for changes',
      'Follow proper hygiene practices'
    ];
  }

  private extractFollowUp(): string {
    const followUpMatch = this.content.match(/follow[- ]up:?\s*([^\.]+)/i);
    return followUpMatch ? 
      followUpMatch[1].trim() : 
      'Schedule a consultation with a healthcare professional';
  }
}