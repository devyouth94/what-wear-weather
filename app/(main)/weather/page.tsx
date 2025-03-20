'use client';

import { useEffect } from 'react';

import OOTDContainer from '~/src/components/outfit/ootd-container';
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
      <OOTDContainer />
      <Forecast />
    </>
  );
};

export default Weather;
