'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import OOTDDialog from '~/src/components/outfit/ootd-dialog';
import { Card, CardContent } from '~/src/components/ui/card';
import { useOutfitFilter } from '~/src/contexts/my-outfit-filter-provider';
import { useGetOutfitList } from '~/src/queries/use-get-outfit-list';

const MyOutfitList = () => {
  const { ref, inView } = useInView();
  const { filter } = useOutfitFilter();

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, error } =
    useGetOutfitList(filter);

  useEffect(() => {
    if (!inView) return;

    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetching]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {data && (
        <div>
          {data.map((outfit) => (
            <Card key={outfit.id}>
              <CardContent className="relative aspect-video overflow-hidden p-0">
                <OOTDDialog outfitToday={outfit} />
              </CardContent>
            </Card>
          ))}

          {!isFetching && hasNextPage && <div ref={ref} className="h-10" />}
        </div>
      )}
    </div>
  );
};

export default MyOutfitList;
