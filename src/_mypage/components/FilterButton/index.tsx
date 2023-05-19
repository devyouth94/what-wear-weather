import { TArticleFilter } from '@/types/articleTypes';

import * as S from './index.styles';

interface Props {
  filter: TArticleFilter;
  handleFilter: (filter: TArticleFilter) => void;
}

const FILTER_ARR: TArticleFilter[] = ['최신순', '온도별 검색'];

const FilterButton = ({ filter, handleFilter }: Props) => {
  return (
    <S.ButtonContainer>
      {FILTER_ARR.map((item, idx) => (
        <S.Button key={idx} onClick={() => handleFilter(item)} select={filter === item}>
          {item}
        </S.Button>
      ))}
    </S.ButtonContainer>
  );
};

export default FilterButton;
