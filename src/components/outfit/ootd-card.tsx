import Image from 'next/image';

import { type GetOutfitTodayResponse } from '~/src/queries/use-get-outfit-today';
import { formatKoreanTime } from '~/src/utils/date';

type Props = {
  outfitToday: NonNullable<GetOutfitTodayResponse>;
};

const OOTDCard = ({ outfitToday }: Props) => {
  return (
    <>
      <div className="absolute inset-0 z-10 flex items-end justify-between rounded-xl bg-gradient-to-b from-transparent via-transparent to-primary/80 p-3 text-muted">
        <p className="flex flex-col items-start">
          <span className="text-4xl font-bold">{`${outfitToday.temp}°`}</span>
          <span className="text-xs">{`최저 ${outfitToday.temp_min}° / 최고 ${outfitToday.temp_max}°`}</span>
        </p>
        <p className="flex flex-col items-end text-xs">
          <span>
            {formatKoreanTime(outfitToday.created_at, 'yyyy년 M월 d일')}
          </span>
          <span>{formatKoreanTime(outfitToday.created_at, 'a h:mm')}</span>
        </p>
      </div>

      <Image
        src={outfitToday.image_url}
        sizes="1080px"
        alt="오늘의 옷"
        fill
        className="rounded-xl object-cover"
      />
    </>
  );
};

export default OOTDCard;
