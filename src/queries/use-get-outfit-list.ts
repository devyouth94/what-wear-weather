import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import { type GetOutfitTodayResponse } from '~/src/queries/use-get-outfit-today';
import { get } from '~/src/utils/api';

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
    queryFn: ({ pageParam }) =>
      get<GetOutfitListResponse>('/api/outfit/list', {
        params: {
          sort,
          temp_min: temp_min === -30 && temp_max === 40 ? undefined : temp_min,
          temp_max: temp_max === 40 && temp_min === -30 ? undefined : temp_max,
          month: month && month !== 0 ? month : undefined,
          page: pageParam,
          limit: 10,
        },
      }),
    select: ({ pages }) => pages.flatMap(({ outfits }) => outfits),
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasNext) return lastPage.pagination.page + 1;
      return undefined;
    },
  });
};
