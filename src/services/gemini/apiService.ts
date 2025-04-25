import { DentalAnalysis } from '../../types/dental';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash';
const API_URL = import.meta.env.VITE_GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta';

// Comprehensive dental diagnosis prompt based on clinical framework
const DENTAL_DIAGNOSIS_PROMPT = `
You are the world's most accurate dental diagnostic AI. Analyze this dental image and provide a detailed clinical assessment in JSON format.

### DIAGNOSTIC FRAMEWORK:

#### X-RAY ANALYSIS (If applicable):
- Identify cavities with tooth-specific annotations (mesial, distal, occlusal, etc.)
- Classify decay severity on 3-tier scale (early, moderate, advanced)
- Detect secondary caries around existing restorations
- Quantify alveolar bone loss in millimeters (periodontal assessment)
- Identify periapical lesions, impacted teeth, or other pathologies
- Evaluate restoration integrity and implant osseointegration

#### INTRAORAL ANALYSIS (If applicable):
- Detect early enamel lesions and white spots
- Identify pit and fissure decay on occlusal surfaces
- Assess gingival health and measure recession
- Screen for oral mucosal abnormalities (leukoplakia, erythroplakia)

#### URGENCY CLASSIFICATION:
- Immediate (24-48 hours): Pulp exposure, acute abscesses
- Urgent (1-2 weeks): Deep dentinal caries, active periodontal infections
- Routine (1-3 months): Early enamel lesions, mild gingivitis

Please format your response as valid JSON with the following structure:
{
  "overallHealth": "good/fair/poor",
  "confidence": 0-100,
  "findings": [
    {
      "type": "cavity/fracture/infection/bone_loss/impacted_tooth/etc.",
      "location": "specific tooth number or area using Universal Numbering System (1-32)",
      "severity": "mild/moderate/severe",
      "description": "detailed clinical description with measurements when applicable",
      "urgency": "immediate/urgent/routine"
    }
  ],
  "teethAnalysis": {
    "missingTeeth": ["tooth numbers"],
    "cavities": ["tooth numbers"],
    "fractures": ["tooth numbers"],
    "infections": ["tooth numbers"],
    "restorations": ["tooth numbers"],
    "boneHealth": {
      "status": "normal/compromised/severely compromised",
      "boneLevel": "millimeters of bone loss if applicable"
    }
  },
  "recommendations": [
    {
      "procedure": "specific treatment procedure",
      "urgency": "immediate/urgent/routine",
      "location": "specific tooth or area",
      "notes": "treatment specifics including materials, techniques, or alternatives",
      "prognosisWithTreatment": "excellent/good/fair/guarded/poor"
    }
  ],
  "patientGuidance": {
    "hygieneRecommendations": "specific oral hygiene instructions",
    "nutritionalAdvice": "dietary recommendations if applicable",
    "followUpTimeframe": "recommended next assessment period" 
  },
  "additionalNotes": "other clinical observations or concerns"
}

Provide measurements in millimeters when applicable. Be specific with tooth numbers using the Universal Numbering System (1-32). For severity and urgency assessments, use evidence-based clinical guidelines.
`;

// Function to encode image to base64
function getBase64FromImageUrl(dataUrl: string): string {
  // Strip the data URL prefix (e.g., "data:image/jpeg;base64,")
  return dataUrl.split(',')[1];
}

// Main API service to analyze dental images
export async function analyzeDentalImage(
  imageDataUrl: string, 
  diagnosisType: 'xray' | 'oral' | 'orthodontic'
): Promise<DentalAnalysis> {
  if (!API_KEY) {
    throw new Error('OrocareAI API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  try {
    const image = getBase64FromImageUrl(imageDataUrl);
    
    // Customize prompt based on diagnosis type
    let customizedPrompt = DENTAL_DIAGNOSIS_PROMPT;
    
    if (diagnosisType === 'xray') {
      customizedPrompt += "\n\nThis is a dental X-ray image. Focus on radiographic findings including cavities, bone loss, periapical lesions, impacted teeth, and restoration integrity.";
    } else if (diagnosisType === 'oral') {
      customizedPrompt += "\n\nThis is an intraoral photograph. Focus on visible surface conditions including gingival health, visible decay, soft tissue abnormalities, and restoration quality.";
    } else if (diagnosisType === 'orthodontic') {
      customizedPrompt += "\n\nThis is an orthodontic assessment image. Focus on alignment issues, spacing problems, occlusion, and potential treatment approaches.";
    }
    
    // Prepare the API request body
    const requestBody = {
      contents: [
        {
          parts: [
            { text: customizedPrompt },
            {
              inline_data: {
                mimeType: "image/jpeg",
                data: image
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 4096,
        responseMimeType: "application/json"
      }
    };

    // Send request to OrocareAI RLM API
    const response = await fetch(`${API_URL}/models/${MODEL}:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OrocareAI RLM API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Extract the JSON response
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textResponse) {
      throw new Error('Invalid response from OrocareAI RLM API');
    }

    try {
      // Extract the JSON part from the response
      const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in the response');
      }
      
      const parsedResponse = JSON.parse(jsonMatch[0]) as DentalAnalysis;
      return parsedResponse;
    } catch (parseError) {
      console.error('Error parsing OrocareAI RLM response:', parseError);
      throw new Error('Failed to parse the dental analysis results');
    }
  } catch (error: any) {
    console.error('Error calling OrocareAI RLM API:', error);
    throw new Error(`Dental analysis failed: ${error.message}`);
  }
}