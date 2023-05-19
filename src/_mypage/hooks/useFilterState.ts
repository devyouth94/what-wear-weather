import { useState } from 'react';

import type { TArticleFilter } from '@/types/articleTypes';

const useFilterState = () => {
  const [filter, setFilter] = useState<TArticleFilter>('최신순');

  const handleFilter = (item: TArticleFilter) => {
    setFilter(item);
  };

  return { filter, handleFilter };
};

export default useFilterState;
