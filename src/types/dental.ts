export type FindingType = 
  | 'cavity' 
  | 'fracture' 
  | 'infection' 
  | 'misalignment'
  | 'bone_loss'
  | 'impacted_tooth'
  | 'periapical_lesion' 
  | 'gingivitis'
  | 'periodontitis'
  | 'secondary_caries'
  | 'enamel_lesion'
  | 'pulp_exposure'
  | 'abscess'
  | 'leukoplakia'
  | 'erythroplakia'
  | 'restoration_failure'
  | 'recession'
  | 'cyst'
  | 'tumor'
  | 'other';

export type SeverityLevel = 'mild' | 'moderate' | 'severe';

export type UrgencyLevel = 'immediate' | 'urgent' | 'routine';

export type OverallHealth = 'good' | 'fair' | 'poor';

export type PrognosisLevel = 'excellent' | 'good' | 'fair' | 'guarded' | 'poor';

export type BoneHealthStatus = 'normal' | 'compromised' | 'severely compromised';

export interface Finding {
  type: FindingType;
  location: string;
  severity: SeverityLevel;
  description: string;
  urgency: UrgencyLevel;
}

export interface BoneHealth {
  status: BoneHealthStatus;
  boneLevel?: string;
}

export interface TeethAnalysis {
  missingTeeth: string[];
  cavities: string[];
  fractures: string[];
  infections: string[];
  restorations: string[];
  boneHealth?: BoneHealth;
}

export interface Recommendation {
  procedure: string;
  urgency: UrgencyLevel;
  location: string;
  notes: string;
  prognosisWithTreatment: PrognosisLevel;
}

export interface PatientGuidance {
  hygieneRecommendations: string;
  nutritionalAdvice: string;
  followUpTimeframe: string;
}

export interface DentalAnalysis {
  overallHealth: OverallHealth;
  confidence: number;
  findings: Finding[];
  teethAnalysis?: TeethAnalysis;
  recommendations: Recommendation[];
  patientGuidance?: PatientGuidance;
  additionalNotes?: string;
}

export type DiagnosisType = 'xray' | 'oral' | 'orthodontic'; 