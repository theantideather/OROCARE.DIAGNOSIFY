import { ConditionAnalysis, ConditionType } from '../types';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

async function analyzeImageWithAI(
  imageBase64: string,
  conditionType: ConditionType
): Promise<ConditionAnalysis> {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this ${conditionType} condition image and provide a detailed medical analysis. Include potential diagnosis, severity level (low/medium/high), and recommendations.`
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error('AI analysis failed');
    }

    const data = await response.json();
    return parseAIResponse(data.choices[0].message.content);
  } catch (error) {
    console.error('AI Analysis error:', error);
    throw new Error('Failed to analyze image');
  }
}

function parseAIResponse(content: string): ConditionAnalysis {
  // This is a simple parser - you might want to make it more sophisticated
  const lines = content.split('\n');
  
  return {
    diagnosis: lines[0] || 'Unable to determine diagnosis',
    severity: determineSeverity(content),
    confidence: calculateConfidence(content),
    recommendations: extractRecommendations(content),
    followUp: extractFollowUp(content)
  };
}

function determineSeverity(content: string): 'low' | 'medium' | 'high' {
  const content_lower = content.toLowerCase();
  if (content_lower.includes('severe') || content_lower.includes('high risk')) {
    return 'high';
  } else if (content_lower.includes('mild') || content_lower.includes('low risk')) {
    return 'low';
  }
  return 'medium';
}

function calculateConfidence(content: string): number {
  // You can implement more sophisticated confidence calculation
  return 85;
}

function extractRecommendations(content: string): string[] {
  const recommendations: string[] = [];
  const lines = content.split('\n');
  
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

function extractFollowUp(content: string): string {
  const followUpMatch = content.match(/follow[- ]up:?\s*([^\.]+)/i);
  return followUpMatch ? followUpMatch[1].trim() : 'Schedule a consultation with a healthcare professional';
}

export { analyzeImageWithAI };