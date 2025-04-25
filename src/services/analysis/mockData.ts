// Mock data for testing chart analysis
export const MOCK_PATTERNS = {
  bullish: [
    'Ascending Triangle',
    'Cup and Handle',
    'Inverse Head and Shoulders',
    'Bull Flag',
    'Double Bottom'
  ],
  bearish: [
    'Descending Triangle',
    'Head and Shoulders',
    'Double Top',
    'Bear Flag',
    'Rising Wedge'
  ],
  neutral: [
    'Symmetrical Triangle',
    'Rectangle Pattern',
    'Consolidation',
    'Trading Range',
    'Sideways Channel'
  ]
} as const;

export const MOCK_SUPPORT_LEVELS = [
  '$45,200',
  '$44,800',
  '$44,300',
  '$43,900',
  '$43,500'
];

export const MOCK_RESISTANCE_LEVELS = [
  '$46,800',
  '$47,200',
  '$47,600',
  '$48,000',
  '$48,500'
];