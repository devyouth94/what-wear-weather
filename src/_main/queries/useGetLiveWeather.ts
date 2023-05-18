import { useQuery } from '@tanstack/react-query';

import { getLiveWeather } from '@/apis/weatherApi';
import { WEATHER_IMAGE } from '@/constants/weatherImage';
import { changeInteger } from '@/utils/changeInteger';
import { shortNowTime } from '@/utils/timeCalculate';
import { useBackgroundImageActions } from '@/stores/useBackgroundImageStore';
import type { TLocation } from '@/types/locationTypes';
import type { TLiveWeather } from '@/types/weatherTypes';

const useGetLiveWeather = (location: TLocation) => {
  const { changeState } = useBackgroundImageActions();

  return useQuery(
    ['live'],
    () => getLiveWeather(location.coordinates?.lat, location.coordinates?.lon),
    {
      enabled: location.loaded,
      select: (data): TLiveWeather => ({
        temp: changeInteger(data.main.temp),
        feels_temp: changeInteger(data.main.feels_like),
        weather: data.weather[0],
        time: shortNowTime(data.dt),
        city_id: data.id,
      }),
      onSuccess: (data) => {
        const weatherImage =
          WEATHER_IMAGE[data.weather.main.toLowerCase()] || WEATHER_IMAGE['mist'];
        changeState(weatherImage);
      },
    },
  );
};

export default useGetLiveWeather;
