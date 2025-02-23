import { getNearbyPlaces } from './GoogleMapsService';

const testGoogleMapsAPI = async () => {
  const latitude = 25.7617; // Example: Miami, FL
  const longitude = -80.1918;

  const places = await getNearbyPlaces(latitude, longitude);
  console.log('Nearby Places:', places);
};

testGoogleMapsAPI();
