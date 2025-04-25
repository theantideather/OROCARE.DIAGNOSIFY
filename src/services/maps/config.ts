export const MAPS_CONFIG = {
  // Google Maps API configuration
  API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  SEARCH_RADIUS: 5000, // 5km radius
  MAX_RESULTS: 10,
  PLACE_TYPES: ['doctor', 'hospital', 'dentist', 'health'],
  
  // Default map center (will be overridden by user's location)
  DEFAULT_CENTER: {
    lat: 40.7128,
    lng: -74.0060
  },
  
  // Place search parameters
  RANKING_OPTIONS: ['distance', 'rating'],
  MIN_RATING: 4.0,
  
  ERROR_MESSAGES: {
    LOCATION_DENIED: 'Location access denied. Please enable location services to find nearby doctors.',
    LOCATION_UNAVAILABLE: 'Unable to determine your location.',
    PLACES_ERROR: 'Error finding nearby medical facilities.',
    NO_RESULTS: 'No medical facilities found in your area.',
    API_ERROR: 'Error connecting to Google Maps service.'
  }
} as const;