import { useSession } from 'next-auth/react';

import useGeolocation from '@/hooks/common/useGeolocation';
import useGetCityName from '@/hooks/main/useGetCityName';
import useGetLiveWeather from '@/hooks/main/useGetLiveWeather';
import useGetDailyWeather from '@/hooks/main/useGetDailyWeather';

const Main = () => {
  const { location, handleNewLocation } = useGeolocation();

  const { data: userData } = useSession();
  const { data: cityNameData, status: cityNameStatus } = useGetCityName(location);
  const { data: liveWeatherData, status: liveWeatherStatus } = useGetLiveWeather(location);
  const { data: dailyWeatherData, status: dailyWeatherStatus } = useGetDailyWeather(location);

  return (
    <>
      <div>
        <img src={userData?.user?.image || ''} />
        <p>어서오세요 {userData?.user?.name || ''}님!</p>
      </div>

      <div>오늘의 옷을 등록하러 갈까요?</div>

      <a
        href={`https://openweathermap.org/city/${liveWeatherData?.city_id}`}
        target="_blank"
        rel="noreferrer">
        <div>
          <div>
            {cityNameData?.ko || cityNameData?.en}의 날씨는 {liveWeatherData?.weather.description}
          </div>
          <div>
            <img src={`http://openweathermap.org/img/wn/${liveWeatherData?.weather.icon}@2x.png`} />
          </div>
          <div>
            현재 온도는 {liveWeatherData?.temp}&#8451;, 체감 온도는 {liveWeatherData?.feels_temp}
            &#8451;에요
          </div>
          <div>{liveWeatherData?.time} 기준</div>
        </div>
      </a>

      <div>
        {dailyWeatherStatus === 'success' &&
          dailyWeatherData.map((daily, idx) => (
            <div key={idx}>
              <span>{idx === 0 ? '오늘' : daily.time}</span>
              <span>
                <img src={`http://openweathermap.org/img/wn/${daily.weather.icon}@2x.png`} />
              </span>
              <span>
                {daily.temp_min} / {daily.temp_max} &#8451;
              </span>
            </div>
          ))}
      </div>
    </>
  );
};

export default Main;
