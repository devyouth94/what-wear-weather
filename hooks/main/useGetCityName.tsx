import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { CityName, Location } from '@/lib/constants/types';

export const getCityName = async (lat: number, lon: number): Promise<CityName> => {
  const { data } = await axios.get(
    `http://api.openweathermap.org/geo/1.0/reverse?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&lat=${lat}&lon=${lon}`,
  );

  return {
    en: data[0].name,
    ko: data[0].local_names.ko || '',
  };
};

const useGetCityName = (location: Location) => {
  return useQuery(
    ['city'],
    () => getCityName(location.coordinates?.lat || 0, location.coordinates?.lon || 0),
    {
      enabled: location.loaded,
      staleTime: 1000 * 60 * 30,
      cacheTime: 1000 * 60 * 60,
      refetchOnMount: false,
    },
  );
};

export default useGetCityName;
