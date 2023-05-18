import Image from 'next/image';

import useGetDailyWeather from '@/_main/queries/useGetDailyWeather';

import Slider from '@/@shared/elements/Slider';
import Text from '@/@shared/elements/Text';
import type { TLocation } from '@/types/locationTypes';

import * as S from './index.styles';

interface Props {
  location: TLocation;
}

const DailyWeather = ({ location }: Props) => {
  const { data: dailyWeatherData } = useGetDailyWeather(location);

  return (
    <>
      {dailyWeatherData && (
        <S.Container>
          {dailyWeatherData.daily.map((daily, idx) => (
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
                <Slider
                  min={dailyWeatherData.week.min}
                  max={dailyWeatherData.week.max}
                  defaultValue={[daily.temp_min, daily.temp_max]}
                  disabled
                  renderTrack={Slider.Track}
                />
                <Text variant="head_04">{daily.temp_max} &#8451;</Text>
              </S.Temperature>
            </S.Item>
          ))}
        </S.Container>
      )}
    </>
  );
};

export default DailyWeather;
