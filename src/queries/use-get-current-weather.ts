import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useGeolocation } from '~/src/contexts/geolocation-provider';
import { get } from '~/src/utils/api';

export type GetCurrentWeatherResponse = {
  location: string;
  weather: string;
  wind_speed: number;
  humidity: number;
  temp: number;
  temp_feels: number;
  temp_min: number;
  temp_max: number;
};

const useGetCurrentWeather = () => {
  const { geolocation } = useGeolocation();
  const { lat, lng } = geolocation!;

  return useQuery({
    queryKey: ['current-weather'],
    queryFn: () =>
      get<GetCurrentWeatherResponse>('/api/weather/current', {
        params: { latitude: lat, longitude: lng },
        next: { revalidate: 60 },
      }),
    placeholderData: keepPreviousData,
  });
};

export default useGetCurrentWeather;
