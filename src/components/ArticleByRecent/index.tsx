import ArticleItem from '@/components/ArticleItem';
import useGetArticles from '@/hooks/mypage/useGetArticles';

import * as S from './index.styles';

const ArticleByRecent = () => {
  const { data: articlesData } = useGetArticles();

  return (
    <>
      {articlesData && (
        <S.RecentContainer>
          {articlesData.map((article) => (
            <ArticleItem key={article.id} {...article} />
          ))}
        </S.RecentContainer>
      )}
    </>
  );
};

export default ArticleByRecent;
