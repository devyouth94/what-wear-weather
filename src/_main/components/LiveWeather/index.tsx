import React from 'react';
import Image from 'next/image';

import useGetCityName from '@/_main/queries/useGetCityName';
import useGetLiveWeather from '@/_main/queries/useGetLiveWeather';

import Text from '@/@shared/elements/Text';
import type { TLocation } from '@/types/locationTypes';

import * as S from './index.styles';

interface Props {
  location: TLocation;
}

const LiveWeather = ({ location }: Props) => {
  const { data: cityNameData } = useGetCityName(location);
  const { data: liveWeatherData } = useGetLiveWeather(location);

  return (
    <>
      {cityNameData && liveWeatherData && (
        <S.LiveWeather>
          <Text variant="head_01">
            <a
              href={`https://openweathermap.org/city/${liveWeatherData.city_id}`}
              target="_blank"
              rel="noreferrer">
              {cityNameData.ko || cityNameData.en}
            </a>
          </Text>

          <S.FlexMiddle>
            <Text variant="head_xl">{liveWeatherData.temp}&#8451;</Text>
            <S.WeatherBadge>{liveWeatherData.weather.description}</S.WeatherBadge>
          </S.FlexMiddle>

          <S.FlexBottom>
            <Text variant="head_04">체감온도 {liveWeatherData.feels_temp}&#8451;</Text>
            <Text variant="caption">{liveWeatherData.time} 기준</Text>
          </S.FlexBottom>

          <S.WeatherIcon>
            <Image
              fill
              src={`weather-icons/${liveWeatherData.weather.icon}.svg`}
              alt={liveWeatherData.weather.icon}
              sizes="170px"
              priority
            />
          </S.WeatherIcon>
        </S.LiveWeather>
      )}
    </>
  );
};

export default LiveWeather;
