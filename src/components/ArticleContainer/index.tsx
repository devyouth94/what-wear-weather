import FilterButton from '@/components/FilterButton';
import ArticleByRecent from '@/components/ArticleByRecent';

import useFilterState from '@/hooks/mypage/useFilterState';

import * as S from './index.styles';

const ArticleContainer = () => {
  const { filter, handleFilter } = useFilterState();

  return (
    <S.Container>
      <FilterButton filter={filter} handleFilter={handleFilter} />

      {filter === '최신순' && <ArticleByRecent />}
    </S.Container>
  );
};

export default ArticleContainer;
