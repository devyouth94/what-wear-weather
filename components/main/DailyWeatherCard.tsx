import Image from 'next/image';

import type { DailyWeather } from '@/lib/constants/types';

type Props = {
  dailyWeatherData: DailyWeather[];
};

const DailyWeatherCard = ({ dailyWeatherData }: Props) => {
  return (
    <ul className="flex flex-col justify-center items-center w-full backdrop-blur-sm bg-neutral-200/40 mt-5 rounded-lg">
      {dailyWeatherData.map((daily, idx) => (
        <li key={idx} className="grid grid-cols-[70px_60px_auto] items-center w-full h-[50px] px-5">
          <span className="text-sm font-semibold text-neutral-800">
            {idx === 0 ? '오늘' : daily.time}
          </span>
          <span className="relative flex justify-center items-center w-7 h-7">
            <Image
              src={`static/weatherIcon/${daily.weather.icon}.svg`}
              alt="weather_icon"
              fill
              priority
            />
          </span>
          <span className="flex items-center justify-end font-semibold text-neutral-800">
            {daily.temp_min} / {daily.temp_max} &#8451;
          </span>
        </li>
      ))}
    </ul>
  );
};

export default DailyWeatherCard;
