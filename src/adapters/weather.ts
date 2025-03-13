import {
  type GetUltraSrtFcstResponse,
  type GetUltraSrtNcstResponse,
  type GetVilageFcstResponse,
  type UltraSrtNcstCategory,
  type VilageFcstCategory,
} from '~/src/apis/weather';

export const ultraSrtNcstAdapter = (data: GetUltraSrtNcstResponse) => {
  return data.response.body.items.item.reduce(
    (acc, item) => {
      acc[item.category] = item.obsrValue;
      return acc;
    },
    {} as Record<UltraSrtNcstCategory, string>,
  );
};

export const ultraSrtFcstAdapter = (data: GetUltraSrtFcstResponse) => {
  const item = data.response.body.items.item.find(
    (item) => item.category === 'SKY',
  )!;

  return item.fcstValue;
};

export const vilageFcstAdapter = (data: GetVilageFcstResponse) => {
  const groupedByDate: Record<string, Record<VilageFcstCategory, string>> = {};
  const array = data.response.body.items.item;

  for (let i = 0; i < array.length; i++) {
    const { category, fcstDate, fcstValue } = array[i];

    if (
      category !== 'PTY' &&
      category !== 'SKY' &&
      category !== 'TMN' &&
      category !== 'TMX'
    ) {
      continue;
    }

    if (!groupedByDate[fcstDate]) {
      groupedByDate[fcstDate] = {} as Record<VilageFcstCategory, string>;
    }

    groupedByDate[fcstDate][category] = fcstValue;
  }

  return Object.entries(groupedByDate).map(([key, value]) => ({
    date: key,
    ...value,
  }));
};
