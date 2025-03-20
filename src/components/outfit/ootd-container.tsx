import Image from 'next/image';

import OOTDDrawer from '~/src/components/outfit/ootd-drawer';
import { Card, CardContent } from '~/src/components/ui/card';
import useGetOutfitToday from '~/src/queries/use-get-outfit-today';
import { formatKoreanTime } from '~/src/utils/date';

const OOTDContainer = () => {
  const { data: outfitToday, isLoading } = useGetOutfitToday();

  if (isLoading) {
    return <Card>Loading...</Card>;
  }

  console.log({ outfitToday });

  return (
    <Card>
      {outfitToday === null && (
        <CardContent className="p-0">
          <OOTDDrawer />
        </CardContent>
      )}

      {outfitToday && (
        <CardContent className="relative aspect-video overflow-hidden p-0">
          <Image
            src={outfitToday.image_url}
            alt="오늘의 옷"
            fill
            className="rounded-xl object-cover"
          />

          <div className="absolute inset-0 z-10">
            <div>
              <div>{outfitToday.temp}°C</div>
              <div>{outfitToday.weather}</div>
            </div>
            <div>
              <div>{outfitToday.location}</div>
              <div>{formatKoreanTime(outfitToday.created_at, 'a h:mm')}</div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default OOTDContainer;
