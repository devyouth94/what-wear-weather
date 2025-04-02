import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const useCreateOutfitToday = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const url = '/api/outfit/today';

      const response = await fetch(url, {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const error = await response.json();
        throw error;
      }

      return response.json();
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
