import FilterButton from '@/components/FilterButton';
import ArticleByRecent from '@/components/ArticleByRecent';
import ArticleByTemp from '@/components/ArticleByTemp';

import useFilterState from '@/hooks/mypage/useFilterState';

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
