import { MAPS_CONFIG } from './config';
import type { NearbyClinic } from '../../types';

export class PlacesService {
  private static async searchNearbyPlaces(
    position: GeolocationPosition,
    type: string,
    specialtyKeywords: string[]
  ): Promise<google.maps.places.PlaceResult[]> {
    const { latitude, longitude } = position.coords;
    const location = new google.maps.LatLng(latitude, longitude);

    const request = {
      location,
      radius: MAPS_CONFIG.SEARCH_RADIUS,
      type,
      keyword: specialtyKeywords.join(' '),
      rankBy: google.maps.places.RankBy.DISTANCE
    };

    const service = new google.maps.places.PlacesService(
      document.createElement('div')
    );

    return new Promise((resolve, reject) => {
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          resolve(results);
        } else {
          reject(new Error(MAPS_CONFIG.ERROR_MESSAGES.PLACES_ERROR));
        }
      });
    });
  }

  static async findNearbyDoctors(
    position: GeolocationPosition,
    specialties: string[]
  ): Promise<NearbyClinic[]> {
    try {
      const places = await this.searchNearbyPlaces(
        position,
        'doctor',
        specialties
      );

      return places
        .filter(place => place.rating && place.rating >= MAPS_CONFIG.MIN_RATING)
        .slice(0, MAPS_CONFIG.MAX_RESULTS)
        .map(place => ({
          name: place.name || 'Unknown',
          distance: this.calculateDistance(
            position.coords.latitude,
            position.coords.longitude,
            place.geometry?.location?.lat() || 0,
            place.geometry?.location?.lng() || 0
          ),
          specialty: specialties[0], // Default to first specialty
          rating: place.rating || 0,
          availableSlots: [], // Would need integration with booking system
          phone: place.formatted_phone_number || '',
          address: place.vicinity || ''
        }));
    } catch (error) {
      console.error('Error finding nearby doctors:', error);
      throw error;
    }
  }

  private static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): string {
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance < 1 
      ? `${Math.round(distance * 1000)}m`
      : `${distance.toFixed(1)}km`;
  }

  private static deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}