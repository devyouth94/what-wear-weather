import Image from 'next/image';

import type { CityName, LiveWeather } from '@/lib/constants/types';

type Props = {
  cityNameData: CityName;
  liveWeatherData: LiveWeather;
};

const LiveWeatherCard = ({ cityNameData, liveWeatherData }: Props) => {
  return (
    <a
      href={`https://openweathermap.org/city/${liveWeatherData.city_id}`}
      target="_blank"
      rel="noreferrer">
      <div className="grid grid-cols-[auto_140px] backdrop-blur-sm bg-black/50 px-4 py-3 mt-5 rounded-lg">
        <div className="flex flex-col">
          <span className="text-2xl font-black text-white">
            {cityNameData.ko || cityNameData.en}
          </span>

          <span className="text-3xl font-black text-white mt-4">{liveWeatherData.temp}&#8451;</span>

          <p className="flex gap-2 text-sm font-semibold text-white mt-2">
            <span>체감 온도</span>
            <span>{liveWeatherData?.feels_temp}&#8451;</span>
          </p>

          <span className="text-xs text-white mt-7">{liveWeatherData.time} 기준</span>
        </div>

        <div className="flex flex-col gap-5 justify-center items-center">
          <div className="relative bg-transparent rounded-full w-20 h-20">
            <Image
              fill
              src={`static/weatherIcon/${liveWeatherData.weather.icon}.svg`}
              alt={liveWeatherData.weather.icon}
              sizes="80px"
              priority
            />
          </div>

          <span className="flex bg-neutral-100 px-2 font-bold text-sm rounded-full">
            {liveWeatherData.weather.description}
          </span>
        </div>
      </div>
    </a>
  );
};

export default LiveWeatherCard;
