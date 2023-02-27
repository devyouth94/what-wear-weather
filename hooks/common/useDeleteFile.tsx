import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';

import instance from '@/lib/utils/instance';

const deleteFile = async (postId: string) => {
  const { data } = await instance.delete(`/api/files?postId=${postId}`);

  return data;
};

const useDeleteFile = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(deleteFile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post']);
      toast({
        title: '오늘의 옷 삭제 성공!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: '오류가 발생했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });
};

export default useDeleteFile;
