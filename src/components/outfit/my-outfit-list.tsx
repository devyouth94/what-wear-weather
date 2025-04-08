'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { LoaderIcon } from 'lucide-react';

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

  return (
    <section className="flex grow flex-col p-3">
      {!isLoading && !error && data && (
        <>
          {data.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-2">
                {data.map((outfit) => (
                  <Card key={outfit.id} className="aspect-[3/4]">
                    <CardContent className="relative h-full">
                      <OOTDDialog outfitToday={outfit} />
                    </CardContent>
                  </Card>
                ))}
              </div>

              {!isFetching && hasNextPage && (
                <div
                  ref={ref}
                  className="flex items-center justify-center pt-4"
                >
                  <LoaderIcon size={20} className="animate-spin-slow" />
                </div>
              )}
            </>
          ) : (
            <div className="flex grow items-center justify-center text-neutral-400">
              저장된 옷이 없어요.
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default MyOutfitList;
