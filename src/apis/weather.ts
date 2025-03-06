import { format } from 'date-fns';

import { getPreviousHalfHour } from '~/src/utils/convert-date';

type UltraShortTermForecastCategory = 'T1H' | 'WSD' | 'SKY' | 'PTY';

type GetUltraShortTermForecastResponse = {
  response: {
    body: {
      items: {
        item: Array<{
          category: UltraShortTermForecastCategory;
          obsrValue: string;
        }>;
      };
    };
  };
};

export const getUltraShortTermForecast = async (
  x: number,
  y: number,
): Promise<GetUltraShortTermForecastResponse> => {
  const baseDate = new Date();

  const response = await fetch(
    `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${process.env.NEXT_PUBLIC_KMA_API_KEY}&pageNo=1&numOfRows=8&dataType=JSON&base_date=${format(baseDate, 'yyyyMMdd')}&base_time=${getPreviousHalfHour(baseDate)}&nx=${x}&ny=${y}`,
  );

  return response.json();
};
