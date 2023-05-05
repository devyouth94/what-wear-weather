import { useQuery } from '@tanstack/react-query';

import { getDailyWeather } from '@/apis/weatherApi';
import { changeInteger } from '@/utils/changeInteger';
import type { TLocation } from '@/types/locationTypes';
import type { TDailyWeather } from '@/types/weatherTypes';

const useGetDailyWeather = (location: TLocation) => {
  return useQuery(
    ['daily'],
    () => getDailyWeather(location.coordinates?.lat, location.coordinates?.lon),
    {
      enabled: location.loaded,
      select: (data): { daily: TDailyWeather[]; week: { min: number; max: number } } => ({
        daily: data.daily.map((item: any) => ({
          time: new Intl.DateTimeFormat('ko-KR', {
            weekday: 'long',
          }).format(new Date(item.dt * 1000)),
          weather: item.weather[0],
          temp_min: changeInteger(item.temp.min),
          temp_max: changeInteger(item.temp.max),
        })),
        week: {
          min: changeInteger(Math.min(...data.daily.map((item: any) => item.temp.min))),
          max: changeInteger(Math.max(...data.daily.map((item: any) => item.temp.max))),
        },
      }),
    },
  );
};

export default useGetDailyWeather;
