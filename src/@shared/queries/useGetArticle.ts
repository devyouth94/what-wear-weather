import { useQuery } from '@tanstack/react-query';

import { getArticle } from '@/apis/api';
import { useArticleDrawerState } from '@/stores/useDrawerStore';

const useGetArticle = () => {
  const articleId = useArticleDrawerState();

  return useQuery(['article', articleId], () => getArticle(articleId), { enabled: !!articleId });
};

export default useGetArticle;
