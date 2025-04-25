import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Calendar, Star, Loader } from 'lucide-react';
import type { NearbyClinic } from '../../types';
import { LocationService } from '../../services/maps/locationService';
import { PlacesService } from '../../services/maps/placesService';
import { MAPS_CONFIG } from '../../services/maps/config';

interface RecommendationsPanelProps {
  recommendations: string[];
  specialistTypes: string[];
  urgency: string;
}

export function RecommendationsPanel({
  recommendations,
  specialistTypes,
  urgency
}: RecommendationsPanelProps) {
  const [nearbyClinicData, setNearbyClinicData] = useState<NearbyClinic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNearbyDoctors();
  }, [specialistTypes]);

  const loadNearbyDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const position = await LocationService.getCurrentPosition();
      const clinics = await PlacesService.findNearbyDoctors(position, specialistTypes);
      setNearbyClinicData(clinics);
    } catch (err: any) {
      console.error('Error loading nearby doctors:', err);
      setError(err.message || MAPS_CONFIG.ERROR_MESSAGES.PLACES_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleFindDoctors = () => {
    // Open Google Maps with nearby doctors
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const searchQuery = encodeURIComponent(`${specialistTypes.join('+')}+near+me`);
        const mapsUrl = `https://www.google.com/maps/search/${searchQuery}/@${latitude},${longitude},13z`;
        window.open(mapsUrl, '_blank');
      }, () => {
        // Fallback if geolocation fails
        const searchQuery = encodeURIComponent(`${specialistTypes.join('+')}+doctors`);
        window.open(`https://www.google.com/maps/search/${searchQuery}`, '_blank');
      });
    } else {
      // Fallback for browsers without geolocation
      const searchQuery = encodeURIComponent(`${specialistTypes.join('+')}+doctors`);
      window.open(`https://www.google.com/maps/search/${searchQuery}`, '_blank');
    }
  };

  const handleCallClinic = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommendations</h2>

      <div className="mb-6">
        <button
          onClick={handleFindDoctors}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <MapPin className="w-5 h-5" />
          Find Doctors Near You
        </button>
      </div>

      <div className="mb-6">
        <h3 className="font-medium text-gray-800 mb-2">Recommended Specialists</h3>
        <div className="flex flex-wrap gap-2">
          {specialistTypes.map((specialist, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {specialist}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium text-gray-800 mb-2">Consultation Urgency</h3>
        <div className={`p-3 rounded-lg ${getUrgencyColor(urgency)}`}>
          {urgency}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-800 mb-4">Nearby Specialists</h3>
        
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-6 h-6 text-blue-600 animate-spin" />
            <span className="ml-2 text-gray-600">Finding nearby specialists...</span>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {!loading && !error && nearbyClinicData.length === 0 && (
          <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg">
            {MAPS_CONFIG.ERROR_MESSAGES.NO_RESULTS}
          </div>
        )}

        <div className="space-y-4">
          {nearbyClinicData.map((clinic, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-800">{clinic.name}</h4>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm">{clinic.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Specialty:</span> {clinic.specialty}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Distance:</span> {clinic.distance}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Address:</span> {clinic.address}
              </p>
              
              <div className="flex gap-2">
                {clinic.phone && (
                  <button
                    onClick={() => handleCallClinic(clinic.phone)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </button>
                )}
                <button
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.name + ' ' + clinic.address)}`, '_blank')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getUrgencyColor(urgency: string): string {
  if (urgency.includes('24h')) return 'bg-red-100 text-red-800';
  if (urgency.includes('48h')) return 'bg-orange-100 text-orange-800';
  if (urgency.includes('7 days')) return 'bg-yellow-100 text-yellow-800';
  return 'bg-green-100 text-green-800';
}