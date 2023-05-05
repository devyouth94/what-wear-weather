import { useState, useEffect } from 'react';

import { TLocation } from '@/types/locationTypes';

const useGeolocation = () => {
  const [location, setLocation] = useState<TLocation>({
    loaded: false,
    coordinates: { lat: 0, lon: 0 },
  });

  // 성공에 대한 로직
  const onSuccess = (location: { coords: { latitude: number; longitude: number } }) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      },
    });
  };

  // 에러에 대한 로직
  const onError = (error: { code: number; message: string }) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return { location };
};

export default useGeolocation;
