import { useQuery } from '@tanstack/react-query';

import instance from '@/lib/utils/instance';
import type { GetPostData } from '@/lib/constants/types';

const getPostsBySearch = async (value: number[]) => {
  const { data } = await instance.get<{ result: GetPostData[] }>(
    `/api/files?min=${value[0]}&max=${value[1]}`,
  );

  return data.result;
};

const useGetPostsBySearch = (value: number[]) => {
  return useQuery(['post', `${value[0]}, ${value[1]}`], () => getPostsBySearch(value), {
    enabled: false,
  });
};

export default useGetPostsBySearch;
