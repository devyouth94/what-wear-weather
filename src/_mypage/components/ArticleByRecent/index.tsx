import ArticleContainer from '@/_mypage/elements/ArticleContainer';
import useGetArticles from '@/_mypage/queries/useGetArticles';

import ArticleItem from '@/@shared/components/ArticleItem';

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
