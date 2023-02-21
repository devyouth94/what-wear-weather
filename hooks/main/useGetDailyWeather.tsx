import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { DailyWeather, Location } from '@/lib/constants/types';
import { changeInteger } from '@/lib/utils/changeInteger';

const UNITS = 'metric';
const LANG = 'kr';
const EXCLUDE = 'current,minutely,hourly,alerts';

export const getDailyWeather = async (lat: number, lon: number): Promise<DailyWeather[]> => {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/3.0/onecall?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&lat=${lat}&lon=${lon}&units=${UNITS}&lang=${LANG}&exclude=${EXCLUDE}`,
  );

  return data.daily.map((item: any) => ({
    time: new Intl.DateTimeFormat('ko-KR', {
      weekday: 'long',
    }).format(new Date(item.dt * 1000)),
    weather: item.weather[0],
    temp_min: changeInteger(item.temp.min),
    temp_max: changeInteger(item.temp.max),
  }));
};

const useGetDailyWeather = (location: Location) => {
  return useQuery(
    ['daily'],
    () => getDailyWeather(location.coordinates?.lat || 0, location.coordinates?.lon || 0),
    {
      enabled: location.loaded,
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60 * 3,
      refetchOnMount: false,
    },
  );
};

export default useGetDailyWeather;
