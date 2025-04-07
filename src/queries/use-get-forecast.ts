import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useGeolocation } from '~/src/contexts/geolocation-provider';
import { get } from '~/src/utils/api';

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
  const { lat, lng } = geolocation!;

  return useQuery<GetForecastResponse>({
    queryKey: ['forecast'],
    queryFn: () =>
      get<GetForecastResponse>('/api/weather/forecast', {
        params: { latitude: lat, longitude: lng },
        next: { revalidate: 600 },
      }),
    placeholderData: keepPreviousData,
  });
};

export default useGetForecast;
