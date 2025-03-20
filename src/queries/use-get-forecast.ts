import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import { useGeolocation } from '~/src/contexts/geolocation-provider';

export type GetForecastResponse = {
  data: Array<{
    day: number;
    temp_min: number;
    temp_max: number;
    weather: string;
  }>;
  temp_week_min: number;
  temp_week_max: number;
};

const useGetForecast = () => {
  const { geolocation } = useGeolocation();

  return useQuery<GetForecastResponse>({
    enabled: !!geolocation,
    placeholderData: keepPreviousData,
    queryKey: ['forecast'],
    queryFn: async () => {
      const url = '/api/weather/forecast';
      const params = new URLSearchParams([
        ['latitude', geolocation!.lat.toString()],
        ['longitude', geolocation!.lng.toString()],
        ['baseDate', format(new Date(), 'yyyy-MM-dd HH:mm')],
      ]);

      const response = await fetch(`${url}?${params.toString()}`, {
        next: { revalidate: 600 },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json();
    },
  });
};

export default useGetForecast;
