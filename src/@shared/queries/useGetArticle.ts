import { useQuery } from '@tanstack/react-query';

import { getArticle } from '@/apis/api';
import { useRouter } from 'next/router';

const useGetArticle = () => {
  const { query } = useRouter();
  const articleId = String(query.articleId);

  return useQuery(['article', articleId], () => getArticle(articleId), { enabled: !!articleId });
};

export default useGetArticle;
