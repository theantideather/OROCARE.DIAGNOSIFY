import { CONDITION_TYPES, APP_CONFIG } from './constants';

interface ConditionAnalysis {
  diagnosis: string;
  confidence: number;
  recommendations: string[];
  severity: 'low' | 'medium' | 'high';
  followUp: string;
}

const conditions = {
  [CONDITION_TYPES.DENTAL]: {
    cavity: {
      patterns: ['dark spots', 'holes', 'decay'],
      diagnosis: 'Potential dental cavity detected',
      severity: 'medium',
      followUp: 'Schedule a dental appointment within 1-2 weeks',
      recommendations: [
        'Schedule an appointment with a dentist for proper examination',
        'Maintain good oral hygiene with regular brushing and flossing',
        'Use fluoride toothpaste and consider a fluoride mouthwash',
        'Reduce consumption of sugary foods and drinks',
        'Monitor the affected area for increased sensitivity or pain'
      ]
    },
    gingivitis: {
      patterns: ['red gums', 'swollen gums', 'inflammation'],
      diagnosis: 'Signs of gingivitis (gum inflammation)',
      severity: 'medium',
      followUp: 'Schedule a dental cleaning within 2-3 weeks',
      recommendations: [
        'Improve brushing and flossing routine',
        'Use an antiseptic mouthwash twice daily',
        'Schedule a professional cleaning',
        'Consider using a soft-bristled toothbrush',
        'Monitor for bleeding during brushing'
      ]
    }
  },
  [CONDITION_TYPES.SKIN]: {
    acne: {
      patterns: ['red spots', 'inflammation', 'pimples'],
      diagnosis: 'Appears to be inflammatory acne',
      severity: 'low',
      followUp: 'Monitor for 2-3 weeks with over-the-counter treatment',
      recommendations: [
        'Keep the affected area clean with gentle cleansers',
        'Avoid touching or picking at the spots',
        'Consider benzoyl peroxide or salicylic acid treatments',
        'Use non-comedogenic moisturizers and sunscreen',
        'Consult a dermatologist if condition persists or worsens'
      ]
    },
    eczema: {
      patterns: ['dry patches', 'redness', 'itchy'],
      diagnosis: 'Possible eczema symptoms detected',
      severity: 'medium',
      followUp: 'Schedule a dermatologist appointment if symptoms persist',
      recommendations: [
        'Keep skin moisturized with fragrance-free emollients',
        'Avoid known triggers and harsh skincare products',
        'Use gentle, fragrance-free cleansers',
        'Consider using a humidifier in your room',
        'Apply cool compresses to relieve itching'
      ]
    }
  }
};

export function analyzeCondition(type: keyof typeof conditions): ConditionAnalysis {
  const categoryConditions = conditions[type];
  const conditionKeys = Object.keys(categoryConditions);
  const selectedCondition = categoryConditions[conditionKeys[Math.floor(Math.random() * conditionKeys.length)] as keyof typeof categoryConditions];
  
  return {
    ...selectedCondition,
    confidence: Math.floor(Math.random() * (APP_CONFIG.MAX_CONFIDENCE - APP_CONFIG.MIN_CONFIDENCE) + APP_CONFIG.MIN_CONFIDENCE)
  };
}