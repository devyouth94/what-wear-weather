import { useQuery } from '@tanstack/react-query';

import { getTodayArticle } from '@/apis/api';

const useGetTodayArticle = () => {
  return useQuery(['article', 'today'], getTodayArticle);
};

export default useGetTodayArticle;
