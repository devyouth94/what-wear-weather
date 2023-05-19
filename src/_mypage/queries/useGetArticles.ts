import { useQuery } from '@tanstack/react-query';

import { getArticles } from '@/apis/api';

const useGetArticles = () => {
  return useQuery(['article', 'recented'], getArticles);
};

export default useGetArticles;
