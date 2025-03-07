import { format, subHours } from 'date-fns';

type GetPreviousTimeOptions = 'ultraSrtNcst' | 'ultraSrtFcst';

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

  return format(resultDate, 'HHmm');
};
