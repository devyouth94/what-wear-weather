import Image from 'next/image';

import { type GetOutfitTodayResponse } from '~/src/queries/use-get-outfit-today';
import { formatKoreanTime } from '~/src/utils/date';

type Props = {
  outfitToday: NonNullable<GetOutfitTodayResponse>;
};

const OOTDCard = ({ outfitToday }: Props) => {
  return (
    <>
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

      <Image
        src={outfitToday.image_url}
        alt="오늘의 옷"
        fill
        className="rounded-xl object-cover"
      />
    </>
  );
};

export default OOTDCard;
