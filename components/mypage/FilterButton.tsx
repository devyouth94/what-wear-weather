export type Filter = '최신순' | '온도별 검색하기';

type Props = {
  filter: Filter;
  handleFilter: (item: Filter) => void;
};

const FILTER_ARR: Filter[] = ['최신순', '온도별 검색하기'];

const FilterButton = ({ filter, handleFilter }: Props) => {
  return (
    <div className="flex justify-center items-center gap-1 mt-5">
      {FILTER_ARR.map((item, idx) => (
        <button
          className={`w-full h-9 text-sm font-semibold rounded-md ${
            filter === item ? 'bg-[#b03232] text-white' : 'bg-transparent text-black'
          }`}
          key={idx}
          onClick={() => handleFilter(item)}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default FilterButton;
