import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import { useGeolocation } from '~/src/contexts/geolocation-provider';

export type GetCurrentWeatherResponse = {
  location: string;
  weather: string;
  temp: number;
  temp_feels: number;
  temp_min: number;
  temp_max: number;
};

const TEN_MINUTES = 60 * 1000 * 10;

const useGetCurrentWeather = () => {
  const { geolocation } = useGeolocation();

  return useQuery<GetCurrentWeatherResponse>({
    enabled: !!geolocation,
    placeholderData: keepPreviousData,
    queryKey: ['current-weather'],
    queryFn: async () => {
      const url = '/api/weather/current';
      const params = new URLSearchParams([
        ['latitude', geolocation!.lat.toString()],
        ['longitude', geolocation!.lng.toString()],
        ['baseDate', format(new Date(), 'yyyy-MM-dd HH:mm')],
      ]);

      const response = await fetch(`${url}?${params.toString()}`, {
        next: { revalidate: TEN_MINUTES },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json();
    },
  });
};

export default useGetCurrentWeather;
