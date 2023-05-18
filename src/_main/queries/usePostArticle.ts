import { UseFormReset } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import useGetTodayArticle from '@/_main/queries/useGetTodayArticle';

import { postArticle } from '@/apis/api';
import { useDrawerActions } from '@/stores/useDrawerStore';
import type { TSubmitForm } from '@/types/articleTypes';

const usePostArticle = (reset: UseFormReset<TSubmitForm>) => {
  const { changeDrawerState } = useDrawerActions();
  const { refetch } = useGetTodayArticle();

  return useMutation(postArticle, {
    onSettled: () => {
      changeDrawerState('write');
      reset();
    },
    onSuccess: () => {
      toast.success('오늘의 옷장 등록 성공!');
      refetch();
    },
    onError: () => {
      toast.error('다시 시도해주세요');
    },
  });
};

export default usePostArticle;
