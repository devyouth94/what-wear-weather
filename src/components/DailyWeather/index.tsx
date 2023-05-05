import useGetDailyWeather from '@/hooks/main/useGetDailyWeather';
import type { TLocation } from '@/types/locationTypes';

import * as S from './index.styles';
import Text from '@/elements/Text';
import Image from 'next/image';
import TemperatureBar from '../TemperatureBar';

interface Props {
  location: TLocation;
}

const DailyWeather = ({ location }: Props) => {
  const { data } = useGetDailyWeather(location);

  return (
    <S.Container>
      {data?.daily.map((daily, idx) => (
        <S.Item key={idx}>
          <Text variant="head_04">{idx === 0 ? '오늘' : daily.time}</Text>

          <S.WeatherIcon>
            <Image
              src={`weather-icons/${daily.weather.icon}.svg`}
              alt="weather_icon"
              fill
              priority
            />
          </S.WeatherIcon>

          <S.Temperature>
            <Text variant="head_04">{daily.temp_min} &#8451;</Text>
            <TemperatureBar
              daily={{ min: daily.temp_min, max: daily.temp_max }}
              week={{ min: data.week.min, max: data.week.max }}
            />
            <Text variant="head_04">{daily.temp_max} &#8451;</Text>
          </S.Temperature>
        </S.Item>
      ))}
    </S.Container>
  );
};

export default DailyWeather;
