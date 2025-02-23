import axios from 'axios';
import config from '../config';

interface Place {
  name: string;
  type: string;
  location: {
    lat: number;
    lng: number;
  };
}

export const getNearbyPlaces = async (latitude: number, longitude: number) => {
  if (!config.googleMapsApiKey) {
    console.error('Google Maps API key is not configured');
    return [];
  }

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=2000&type=point_of_interest&key=${config.googleMapsApiKey}`;

  try {
    console.log(
      'Fetching places with URL:',
      url.replace(config.googleMapsApiKey, 'HIDDEN_KEY')
    );
    const response = await axios.get(url);

    // Log the error message if the API returns an error status
    if (response.data.status !== 'OK') {
      console.error('Google Maps API Error:', {
        status: response.data.status,
        error_message: response.data.error_message,
        debug_info: response.data,
      });
      return [];
    }

    if (!response.data.results) {
      console.error('No results in response:', response.data);
      return [];
    }

    const places = response.data.results.map((place: any) => ({
      name: place.name,
      type: place.types[0],
      location: place.geometry.location,
    }));

    console.log('Nearby places found:', places.length);
    // places.map((place: Place) => {
    //   console.log(place);
    // });
    return places;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error Details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    } else {
      console.error('Error fetching places:', error);
    }
    return [];
  }
};
