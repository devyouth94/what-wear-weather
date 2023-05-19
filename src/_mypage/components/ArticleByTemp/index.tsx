import { useState } from 'react';

import ArticleContainer from '@/_mypage/elements/ArticleContainer';
import SearchContainer from '@/_mypage/components/SearchContainer';
import useGetArticlesBySearch from '@/_mypage/queries/useGetArticlesBySearch';

import ArticleItem from '@/@shared/components/ArticleItem';

const ArticleByTemp = () => {
  const [selectedTemp, setSelectedTemp] = useState([-20, 40]);
  const handleClickSearch = (temp: number[]) => {
    setSelectedTemp(temp);
  };

  const { data: articlesData } = useGetArticlesBySearch(selectedTemp);

  return (
    <>
      <SearchContainer handleClickSearch={handleClickSearch} />

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

export default ArticleByTemp;
