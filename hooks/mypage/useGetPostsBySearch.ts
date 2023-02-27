import { useQuery } from '@tanstack/react-query';

import instance from '@/lib/utils/instance';
import type { GetPostData } from '@/lib/constants/types';

type Value = {
  min: number;
  max: number;
};

const getPostsBySearch = async (value: Value) => {
  const { data } = await instance.get<{ result: GetPostData[] }>(
    `/api/files?min=${value.min}&max=${value.max}`,
  );

  return data.result;
};

const useGetPostsBySearch = (value: Value) => {
  return useQuery(['post', `${value.min}, ${value.max}`], () => getPostsBySearch(value), {
    enabled: false,
  });
};

export default useGetPostsBySearch;
