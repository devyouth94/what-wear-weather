import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { type CreateOOTDForm } from '~/src/components/outfit/ootd-drawer';
import useGetCurrentWeather from '~/src/queries/use-get-current-weather';
import { post } from '~/src/utils/api';
import { compressImage } from '~/src/utils/image';

const useCreateOutfitToday = () => {
  const queryClient = useQueryClient();

  const { data: currentWeather } = useGetCurrentWeather();

  return useMutation({
    mutationFn: async (data: CreateOOTDForm) => {
      const compressedImage = await compressImage(data.image);

      const formData = new FormData();

      formData.append('weather', JSON.stringify(currentWeather));
      formData.append('image', compressedImage);
      if (data.description) {
        formData.append('description', data.description);
      }

      return post('/api/outfit/today', formData);
    },
    onSuccess: ({ message }) => {
      toast.success(message);

      queryClient.invalidateQueries({ queryKey: ['outfit-today'] });
      queryClient.invalidateQueries({ queryKey: ['outfit-list'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useCreateOutfitToday;
