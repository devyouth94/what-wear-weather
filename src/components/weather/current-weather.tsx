import { useEffect, useState } from 'react';

import {
  getCurrentWeather,
  type GetCurrentWeatherResponse,
} from '~/src/apis/weather';
import { Card, CardContent } from '~/src/components/ui/card';

type Props = {
  latitude: number;
  longitude: number;
  baseDate: string;
};

const CurrentWeather = ({ latitude, longitude, baseDate }: Props) => {
  const [currentWeather, setCurrentWeather] =
    useState<GetCurrentWeatherResponse | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCurrentWeather(latitude, longitude, baseDate);
        setCurrentWeather(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [latitude, longitude, baseDate]);

  console.log(currentWeather);

  if (currentWeather === null) {
    return (
      <Card>
        <div>loading...</div>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div>{currentWeather.location}</div>
        <div>{currentWeather.weather}</div>
        <div>{currentWeather.temp}</div>
        <div>체감온도 {currentWeather.temp_feels}</div>
        <div>
          <span>최저: {currentWeather.temp_min}</span>
          <span>최고: {currentWeather.temp_min}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
