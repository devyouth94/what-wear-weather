import { useQuery } from '@tanstack/react-query';

import { getTodayArticle } from '@/apis/api';

const useGetTodayArticle = () => {
  return useQuery(['post', 'today'], getTodayArticle);
};

export default useGetTodayArticle;
