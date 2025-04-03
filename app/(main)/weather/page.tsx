'use client';

import { useEffect } from 'react';
import { LoaderIcon } from 'lucide-react';

import OOTDContainer from '~/src/components/outfit/ootd-container';
import CurrentWeather from '~/src/components/weather/current-weather';
import Forecast from '~/src/components/weather/forecast';
import { useGeolocation } from '~/src/contexts/geolocation-provider';

const Weather = () => {
  const { isLoading, error, geolocation, refreshGeolocation } =
    useGeolocation();

  useEffect(() => {
    refreshGeolocation();
  }, [refreshGeolocation]);

  return (
    <>
      {isLoading && (
        <section className="flex grow items-center justify-center">
          <LoaderIcon className="animate-spin-slow" />
        </section>
      )}

      {!isLoading && error && (
        <section className="flex grow items-center justify-center px-3">
          <p className="whitespace-pre-wrap text-center font-medium">{error}</p>
        </section>
      )}

      {!isLoading && geolocation && (
        <>
          <CurrentWeather />
          <OOTDContainer />
          <Forecast />
        </>
      )}
    </>
  );
};

export default Weather;
