import { useEffect, useState, useCallback } from 'react';
import * as Location from 'expo-location';

interface Coordinates {
  latitude: number;
  longitude: number;
}

export const useLocation = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchLocation = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission denied');
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });

    console.log('Fetched Location:', loc.coords);
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return { location, errorMsg, fetchLocation };
};
