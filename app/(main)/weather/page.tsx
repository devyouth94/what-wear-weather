'use client';

import { useEffect } from 'react';

import CurrentWeather from '~/src/components/weather/current-weather';
import Forecast from '~/src/components/weather/forecast';
import { useGeolocation } from '~/src/contexts/geolocation-provider';

const Weather = () => {
  const { isLoading, error, refreshGeolocation } = useGeolocation();

  useEffect(() => {
    refreshGeolocation();
  }, [refreshGeolocation]);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!isLoading && error) {
    return <>{error}</>;
  }

  return (
    <>
      <CurrentWeather />
      <Forecast />
    </>
  );
};

export default Weather;
