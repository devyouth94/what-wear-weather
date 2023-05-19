import ArticleByRecent from '@/_mypage/components/ArticleByRecent';
import ArticleByTemp from '@/_mypage/components/ArticleByTemp';
import FilterButton from '@/_mypage/components/FilterButton';
import useFilterState from '@/_mypage/hooks/useFilterState';

import * as S from './index.styles';

const MyArticles = () => {
  const { filter, handleFilter } = useFilterState();

  return (
    <S.Container>
      <FilterButton filter={filter} handleFilter={handleFilter} />

      {filter === '최신순' && <ArticleByRecent />}
      {filter === '온도별 검색' && <ArticleByTemp />}
    </S.Container>
  );
};

export default MyArticles;
