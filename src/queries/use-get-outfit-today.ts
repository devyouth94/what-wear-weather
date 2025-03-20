import { keepPreviousData, useQuery } from '@tanstack/react-query';

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
  return useQuery<GetOutfitTodayResponse>({
    placeholderData: keepPreviousData,
    queryKey: ['outfit-today'],
    queryFn: async () => {
      const url = '/api/outfit/today';
      const response = await fetch(url, {
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

export default useGetOutfitToday;
