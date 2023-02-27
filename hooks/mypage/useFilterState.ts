import { useState } from 'react';
import type { Filter } from '@/components/mypage/FilterButton';

const useFilterState = () => {
  const [filter, setFilter] = useState<Filter>('최신순');

  const handleFilter = (item: Filter) => {
    setFilter(item);
  };

  return { filter, handleFilter };
};

export default useFilterState;
