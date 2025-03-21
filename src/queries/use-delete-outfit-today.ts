import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const useDeleteOutfitToday = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const url = '/api/outfit/today';

      const response = await fetch(url, {
        method: 'DELETE',
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
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useDeleteOutfitToday;
