import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { LiveWeather, Location } from '@/lib/constants/types';
import { changeInteger } from '@/lib/utils/changeInteger';
import { shortNowTime } from '@/lib/utils/timeCalculate';

const UNITS = 'metric';
const LANG = 'kr';

export const getLiveWeather = async (lat: number, lon: number): Promise<LiveWeather> => {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&lat=${lat}&lon=${lon}&units=${UNITS}&lang=${LANG}`,
  );

  return {
    temp: changeInteger(data.main.temp),
    feels_temp: changeInteger(data.main.feels_like),
    weather: data.weather[0],
    time: shortNowTime(data.dt),
    city_id: data.id,
  };
};

const useGetLiveWeather = (location: Location) => {
  return useQuery(
    ['live'],
    () => getLiveWeather(location.coordinates?.lat || 0, location.coordinates?.lon || 0),
    {
      enabled: location.loaded,
      staleTime: 1000 * 60,
    },
  );
};

export default useGetLiveWeather;
