export const CHART_ANALYSIS_PROMPT = `Analyze this dental X-ray image and provide a detailed diagnosis in JSON format with the following structure:

{
  "overallHealth": "good/fair/poor",
  "confidence": 0-100,
  "findings": [
    {
      "type": "cavity/fracture/infection/misalignment/other",
      "location": "specific tooth number or area",
      "severity": "mild/moderate/severe",
      "description": "detailed description of the finding"
    }
  ],
  "teethAnalysis": {
    "missingTeeth": ["tooth numbers"],
    "cavities": ["tooth numbers"],
    "fractures": ["tooth numbers"],
    "infections": ["tooth numbers"],
    "restorations": ["tooth numbers with existing fillings/crowns/etc"]
  },
  "recommendations": [
    {
      "procedure": "string - e.g. filling, root canal, extraction, etc.",
      "urgency": "immediate/soon/routine",
      "location": "specific tooth number or area",
      "notes": "string"
    }
  ],
  "additionalNotes": "string - any other relevant information"
}

Consider:
1. Tooth decay and cavities
2. Periodontal disease signs
3. Bone loss patterns
4. Root structure integrity
5. Prior dental work
6. Potential infections or abscesses
7. Impacted teeth or misalignments

Provide specific tooth numbers when possible and prioritize urgent issues that require immediate attention.`;