import { getArticle } from '@/apis/api';
import { useArticleDrawerState } from '@/stores/useDrawerStore';
import { useQuery } from '@tanstack/react-query';

const useGetArticle = () => {
  const articleId = useArticleDrawerState();

  return useQuery(['post', articleId], () => getArticle(articleId), { enabled: !!articleId });
};

export default useGetArticle;
