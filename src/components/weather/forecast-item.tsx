import React from 'react';
import { addDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';

type Props = {
  day: number;
  temp_max: number;
  temp_min: number;
  temp_week_min: number;
  temp_week_max: number;
  weather: string;
};

const ForecastItem = ({
  day,
  temp_max,
  temp_min,
  temp_week_min,
  temp_week_max,
  weather,
}: Props) => {
  const getDayText = () => {
    if (day === 1) {
      return '오늘';
    }

    const today = new Date(format(new Date(), 'yyyy-MM-dd HH:mm'));
    const targetDate = addDays(today, day - 1);

    return format(targetDate, 'EEE', { locale: ko });
  };

  const calculateBarPosition = () => {
    const tempRange = temp_week_max - temp_week_min;
    if (tempRange === 0) {
      return { left: 0, width: 100 };
    }

    const leftPosition = ((temp_min - temp_week_min) / tempRange) * 100;
    const rightPosition = ((temp_max - temp_week_min) / tempRange) * 100;
    const width = rightPosition - leftPosition;

    return { left: leftPosition, width };
  };

  const { left, width } = calculateBarPosition();

  return (
    <div className="grid grid-cols-[40px_60px_auto] items-center gap-2 py-3">
      <div>{getDayText()}</div>
      <div className="text-center">{weather}</div>
      <div className="grid grid-cols-[30px_auto_30px] items-center gap-2">
        <span className="text-right">{temp_min}°</span>
        <div className="relative w-full">
          <div className="h-1.5 w-full rounded-full bg-gray-200" />
          <div
            className="absolute top-0 h-1.5 rounded-full bg-black"
            style={{ left: `${left}%`, width: `${width}%` }}
          />
        </div>
        <span className="text-right">{temp_max}°</span>
      </div>
    </div>
  );
};

export default ForecastItem;
