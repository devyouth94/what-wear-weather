import { format, subDays, subHours } from 'date-fns';
import { ko } from 'date-fns/locale';
import { formatInTimeZone } from 'date-fns-tz';

type GetPreviousTimeOptions = 'ultraSrtNcst' | 'ultraSrtFcst';
type GetPreviousDateOptions = 'vilage' | 'mid';

export const getPreviousTime = (
  now: Date,
  options: GetPreviousTimeOptions,
): string => {
  const currentMinute = now.getMinutes();

  let resultDate;

  switch (options) {
    case 'ultraSrtNcst':
      if (currentMinute >= 10) {
        resultDate = new Date(now);
        resultDate.setMinutes(0, 0, 0);
      } else {
        resultDate = subHours(now, 1);
        resultDate.setMinutes(0, 0, 0);
      }
      break;
    case 'ultraSrtFcst':
      if (currentMinute >= 45) {
        resultDate = new Date(now);
        resultDate.setMinutes(30, 0, 0);
      } else {
        resultDate = subHours(now, 1);
        resultDate.setMinutes(30, 0, 0);
      }
      break;
  }

  return formatInTimeZone(resultDate, 'Asia/Seoul', 'HHmm');
};

export const getPreviousDate = (now: Date, options: GetPreviousDateOptions) => {
  const nowHour = Number(format(now, 'HH'));
  const optionsHour = options === 'vilage' ? 2 : 6;

  if (nowHour <= optionsHour) {
    return formatInTimeZone(subDays(now, 1), 'Asia/Seoul', 'yyyyMMdd');
  }

  return formatInTimeZone(now, 'Asia/Seoul', 'yyyyMMdd');
};

export const formatKoreanTime = (date: string | Date, format: string) => {
  return formatInTimeZone(date, 'Asia/Seoul', format, { locale: ko });
};
