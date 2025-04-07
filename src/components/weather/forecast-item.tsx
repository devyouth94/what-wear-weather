import React from 'react';
import { addDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';

import { WEATHER_ICON } from '~/src/constants/weather';

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
  const WeatherIcon = WEATHER_ICON[weather as keyof typeof WEATHER_ICON];

  const getDayText = () => {
    if (day === 1) {
      return '오늘';
    }

    const today = new Date();
    const targetDate = addDays(today, day - 1);

    return format(targetDate, 'EEE', { locale: ko });
  };

  const { left, width } = calculateBarPosition(
    temp_min,
    temp_max,
    temp_week_min,
    temp_week_max,
  );

  return (
    <div className="grid grid-cols-[30px_40px_auto] items-center gap-3 py-3 font-medium">
      <span className="text-center text-sm">{getDayText()}</span>

      <div className="flex items-center justify-center">
        <WeatherIcon strokeWidth={1.4} className="text-neutral-600" />
      </div>

      <div className="grid grid-cols-[30px_auto_30px] items-center gap-3">
        <span className="text-right text-primary/50">{temp_min}°</span>

        <div className="relative w-full">
          <div className="h-1.5 w-full rounded-full bg-gray-200" />
          <div
            className="absolute top-0 h-1.5 w-full rounded-full bg-gradient-to-r from-primary/30 to-primary"
            style={{
              clipPath: `inset(0 ${100 - (left + width)}% 0 ${left}% round 9999px)`,
            }}
          />
        </div>

        <span className="text-right">{temp_max}°</span>
      </div>
    </div>
  );
};

export default ForecastItem;

const calculateBarPosition = (
  temp_min: number,
  temp_max: number,
  temp_week_min: number,
  temp_week_max: number,
) => {
  const tempRange = temp_week_max - temp_week_min;

  if (tempRange === 0) {
    return { left: 0, width: 100 };
  }

  const leftPosition = ((temp_min - temp_week_min) / tempRange) * 100;
  const rightPosition = ((temp_max - temp_week_min) / tempRange) * 100;
  const width = rightPosition - leftPosition;

  return { left: leftPosition, width };
};
