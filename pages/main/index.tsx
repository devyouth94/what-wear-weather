import type { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { Skeleton } from '@chakra-ui/react';

import NullNickname from '@/components/main/NullNickname';
import WriteDrawer from '@/components/main/WriteDrawer';
import Layout from '@/components/common/Layout';
import LiveWeatherCard from '@/components/main/LiveWeatherCard';
import TodayPost from '@/components/main/TodayPost';
import DailyWeatherCard from '@/components/main/DailyWeatherCard';
import ImageAuthorCard from '@/components/main/ImageAuthorCard';
import Nav from '@/components/common/Nav';
import NotFound from '@/pages/404';

import useGeolocation from '@/hooks/common/useGeolocation';
import useGetCityName from '@/hooks/main/useGetCityName';
import useGetLiveWeather from '@/hooks/main/useGetLiveWeather';
import useGetDailyWeather from '@/hooks/main/useGetDailyWeather';
import { WEATHER_IMAGE } from '@/lib/constants/weatherImage';
import Header from '@/components/common/Header';

const Main = () => {
  const { location } = useGeolocation();
  const { data: cityNameData, status: cityNameStatus } = useGetCityName(location);
  const { data: liveWeatherData, status: liveWeatherStatus } = useGetLiveWeather(location);
  const { data: dailyWeatherData, status: dailyWeatherStatus } = useGetDailyWeather(location);

  if (
    cityNameStatus === 'error' ||
    liveWeatherStatus === 'error' ||
    dailyWeatherStatus === 'error'
  ) {
    return <NotFound />;
  }

  if (
    cityNameStatus === 'loading' ||
    liveWeatherStatus === 'loading' ||
    dailyWeatherStatus === 'loading'
  ) {
    return (
      <Layout className="flex flex-col gap-5 pb-24 pt-5">
        <Header />
        <Skeleton height="200px" rounded="lg" />
        <Skeleton height="50px" rounded="lg" />
        <Skeleton height="400px" rounded="lg" />
      </Layout>
    );
  }

  const backgroundData = WEATHER_IMAGE[liveWeatherData.weather.main.toLowerCase()];

  return (
    <>
      <NullNickname />

      <WriteDrawer
        region={cityNameData}
        temp_now={liveWeatherData.temp}
        temp_feels={liveWeatherData.feels_temp}
        temp_min={dailyWeatherData[0].temp_min}
        temp_max={dailyWeatherData[0].temp_max}
      />

      <Layout
        className="pb-24 pt-5"
        style={{
          backgroundImage: `url(${backgroundData.src})`,
          backgroundSize: 'cover',
        }}>
        <Header />

        <LiveWeatherCard cityNameData={cityNameData} liveWeatherData={liveWeatherData} />

        <TodayPost />

        <DailyWeatherCard dailyWeatherData={dailyWeatherData} />

        {backgroundData && <ImageAuthorCard backgroundData={backgroundData} />}
      </Layout>

      <Nav />
    </>
  );
};

export default Main;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req });

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
