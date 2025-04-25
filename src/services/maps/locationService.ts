export class LocationService {
  static async getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(this.handleLocationError(error))
      );
    });
  }

  private static handleLocationError(error: GeolocationPositionError): Error {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return new Error('Location access denied. Please enable location services.');
      case error.POSITION_UNAVAILABLE:
        return new Error('Location information unavailable.');
      case error.TIMEOUT:
        return new Error('Location request timed out.');
      default:
        return new Error('An error occurred while getting your location.');
    }
  }
}