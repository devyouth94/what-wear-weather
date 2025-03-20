import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const useCreateOutfit = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const url = '/api/outfit';

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
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useCreateOutfit;
