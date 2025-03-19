'use client';

import { format } from 'date-fns';

import CurrentWeather from '~/src/components/weather/current-weather';
import Forecast from '~/src/components/weather/forecast';
import useGeolocation from '~/src/hooks/use-geolocation';

const Weather = () => {
  const { isLoading, latAndLng } = useGeolocation();
  const baseDate = format(new Date(), 'yyyy-MM-dd HH:mm');

  if (isLoading) {
    return <>Loading...</>;
  }

  const { latitude, longitude } = latAndLng!;

  return (
    <>
      <CurrentWeather
        latitude={latitude}
        longitude={longitude}
        baseDate={baseDate}
      />
      <Forecast latitude={latitude} longitude={longitude} baseDate={baseDate} />
    </>
  );
};

export default Weather;
