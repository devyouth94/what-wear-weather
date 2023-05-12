import { useState } from 'react';
import ArticleItem from '@/components/ArticleItem';
import ArticleContainer from '@/components/ArticleContainer';
import SearchContainer from '@/components/SearchContainer';

import useGetArticlesBySearch from '@/hooks/mypage/useGetArticlesBySearch';

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
