import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { get } from '~/src/utils/api';

export type GetOutfitTodayResponse = {
  created_at: string;
  description: string | null;
  id: string;
  image_url: string;
  location: string;
  temp: number;
  temp_feels: number;
  temp_max: number;
  temp_min: number;
  user_id: string;
  weather: string;
} | null;

const useGetOutfitToday = () => {
  return useQuery({
    placeholderData: keepPreviousData,
    queryKey: ['outfit-today'],
    queryFn: () =>
      get<GetOutfitTodayResponse>('/api/outfit/today', {
        next: { revalidate: 600 },
      }),
  });
};

export default useGetOutfitToday;
