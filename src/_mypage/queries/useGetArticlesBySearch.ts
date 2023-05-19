import { getArticlesBySearch } from '@/apis/api';
import { useQuery } from '@tanstack/react-query';

const useGetArticlesBySearch = (temp: number[]) => {
  return useQuery(['post', `${temp[0]}, ${temp[1]}`], () => getArticlesBySearch(temp), {
    enabled: !!temp.length,
  });
};

export default useGetArticlesBySearch;
