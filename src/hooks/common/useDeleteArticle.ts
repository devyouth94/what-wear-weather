import { deleteArticle } from '@/apis/api';
import { useDrawerActions } from '@/stores/useDrawerStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  const { changeSelectedId } = useDrawerActions();

  return useMutation(deleteArticle, {
    onSettled: () => {
      changeSelectedId(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['post']);
      toast.success('오늘의 옷장 삭제 성공!');
    },
    onError: () => {
      toast.error('다시 시도해주세요');
    },
  });
};

export default useDeleteArticle;
