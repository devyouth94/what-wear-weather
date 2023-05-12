import ArticleItem from '@/components/ArticleItem';
import ArticleContainer from '@/components/ArticleContainer';

import useGetArticles from '@/hooks/mypage/useGetArticles';

const ArticleByRecent = () => {
  const { data: articlesData } = useGetArticles();

  return (
    <>
      {articlesData && (
        <ArticleContainer>
          {articlesData.map((article) => (
            <ArticleItem key={article.id} {...article} />
          ))}
        </ArticleContainer>
      )}
    </>
  );
};

export default ArticleByRecent;
