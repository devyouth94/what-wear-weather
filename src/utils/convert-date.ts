import { format, subHours } from 'date-fns';

export const getPreviousHalfHour = (now: Date): string => {
  const currentMinute = now.getMinutes();

  let resultDate;

  if (currentMinute >= 30) {
    // 현재 분이 30분 이상이면 현재 시간의 30분으로 설정
    resultDate = new Date(now);
    resultDate.setMinutes(30, 0, 0);
  } else {
    // 현재 분이 30분 미만이면 1시간 전의 30분으로 설정
    resultDate = subHours(now, 1);
    resultDate.setMinutes(30, 0, 0);
  }

  return format(resultDate, 'HHmm');
};
