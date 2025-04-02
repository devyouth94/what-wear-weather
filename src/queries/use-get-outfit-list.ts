import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import { type GetOutfitTodayResponse } from '~/src/queries/use-get-outfit-today';

export type OutfitItem = NonNullable<GetOutfitTodayResponse>;

export type GetOutfitListResponse = {
  outfits: OutfitItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
  };
};

export type GetOutfitListParams = {
  temp_min: number;
  temp_max: number;
  month: number;
  sort: 'asc' | 'desc';
};

export const useGetOutfitList = (filter: Partial<GetOutfitListParams> = {}) => {
  const { temp_min, temp_max, month, sort = 'desc' } = filter;

  return useInfiniteQuery({
    queryKey: ['outfit-list', filter],
    queryFn: async ({ pageParam }) => {
      const url = '/api/outfit/list';
      const params = new URLSearchParams();

      if (!(temp_min === -30 && temp_max === 40)) {
        if (temp_min) params.append('temp_min', temp_min.toString());
        if (temp_max) params.append('temp_max', temp_max.toString());
      }

      //month가 0이면 전체 조회
      if (month && month !== 0) {
        params.append('month', month.toString());
      }

      params.append('sort', sort);
      params.append('page', pageParam.toString());
      params.append('limit', '10');

      const response = await fetch(`${url}?${params.toString()}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '옷 목록을 불러오는데 실패했습니다.');
      }

      return response.json() as Promise<GetOutfitListResponse>;
    },
    placeholderData: keepPreviousData,
    select: ({ pages }) => pages.flatMap(({ outfits }) => outfits),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasNext) return lastPage.pagination.page + 1;
      return undefined;
    },
  });
};
