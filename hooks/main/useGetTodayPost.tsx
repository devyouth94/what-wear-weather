import { useQuery } from '@tanstack/react-query';

import instance from '@/lib/utils/instance';
import type { GetPostData } from '@/lib/constants/types';

const getTodayPost = async () => {
  const { data } = await instance.get<{ result?: GetPostData; ok: boolean }>('/api/files/today');

  return data;
};

const useGetTodayPost = () => {
  return useQuery(['post', 'today'], getTodayPost);
};

export default useGetTodayPost;
