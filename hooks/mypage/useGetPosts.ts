import { useQuery } from '@tanstack/react-query';

import instance from '@/lib/utils/instance';
import type { GetPostData } from '@/lib/constants/types';

const getPosts = async () => {
  const { data } = await instance.get<{ result: GetPostData[] }>('/api/files');

  return data.result;
};

const useGetPosts = () => {
  return useQuery(['post', 'recented'], getPosts);
};

export default useGetPosts;
