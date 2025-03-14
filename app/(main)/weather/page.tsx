'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import {
  getCurrentForecast,
  getCurrentWeather,
  type GetCurrentWeatherResponse,
  type GetForecastResponse,
} from '~/src/apis/weather';
import useGeolocation from '~/src/hooks/use-geolocation';

const Weather = () => {
  const { latAndLng } = useGeolocation();

  const [currentWeather, setCurrentWeather] =
    useState<GetCurrentWeatherResponse | null>(null);
  const [forecast, setForecast] = useState<GetForecastResponse | null>(null);

  useEffect(() => {
    if (!latAndLng) return;

    const baseDate = format(new Date(), 'yyyy-MM-dd HH:mm');

    (async () => {
      const data = await getCurrentWeather(
        latAndLng.latitude,
        latAndLng.longitude,
        baseDate,
      );

      setCurrentWeather(data);
    })();

    (async () => {
      const data = await getCurrentForecast(
        latAndLng.latitude,
        latAndLng.longitude,
        baseDate,
      );

      setForecast(data);
    })();
  }, [latAndLng]);

  console.log('currentWeather', currentWeather);
  console.log('forecast', forecast);

  return <div>Weather</div>;
};

export default Weather;
