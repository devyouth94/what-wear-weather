import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { del } from '~/src/utils/api';

const useDeleteOutfitToday = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => del('/api/outfit/today'),
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

export default useDeleteOutfitToday;
