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
    const diagnosisMatch = this.content.match(/DIAGNOSIS:?\s*([^\n\.]+)/i);
    return diagnosisMatch ? diagnosisMatch[1].trim() : 'Unable to determine diagnosis';
  }

  private determineSeverity(): 'low' | 'medium' | 'high' {
    const severityMatch = this.content.match(/SEVERITY:?\s*([^\n\.]+)/i);
    if (severityMatch) {
      const severity = severityMatch[1].toLowerCase().trim();
      if (['low', 'medium', 'high'].includes(severity)) {
        return severity as 'low' | 'medium' | 'high';
      }
    }
    return 'medium';
  }

  private calculateConfidence(): number {
    const confidenceMatch = this.content.match(/CONFIDENCE:?\s*(\d+)/i);
    return confidenceMatch ? Math.min(parseInt(confidenceMatch[1], 10), 100) : 85;
  }

  private extractRecommendations(): string[] {
    const recommendations: string[] = [];
    const lines = this.content.split('\n');
    
    let inRecommendations = false;
    for (const line of lines) {
      if (line.toLowerCase().includes('recommendations:')) {
        inRecommendations = true;
        continue;
      }
      if (inRecommendations && line.trim().startsWith('-')) {
        recommendations.push(line.trim().substring(1).trim());
      }
      if (inRecommendations && line.toLowerCase().includes('follow-up:')) {
        break;
      }
    }
    
    return recommendations.length > 0 ? recommendations : [
      'Consult with a healthcare professional',
      'Monitor the condition for changes',
      'Follow proper hygiene practices'
    ];
  }

  private extractFollowUp(): string {
    const followUpMatch = this.content.match(/FOLLOW-UP:?\s*([^\n]+)/i);
    return followUpMatch ? 
      followUpMatch[1].trim() : 
      'Schedule a consultation with a healthcare professional';
  }
}