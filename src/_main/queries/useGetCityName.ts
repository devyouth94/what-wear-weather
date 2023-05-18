import { useQuery } from '@tanstack/react-query';

import { getCityName } from '@/apis/weatherApi';
import type { TLocation } from '@/types/locationTypes';
import type { TCityName } from '@/types/weatherTypes';

const useGetCityName = (location: TLocation) => {
  return useQuery(
    ['city'],
    () => getCityName(location.coordinates?.lat, location.coordinates?.lon),
    {
      enabled: location.loaded,
      select: (data): TCityName => ({ en: data[0].name, ko: data[0].local_names.ko || '' }),
    },
  );
};

export default useGetCityName;
