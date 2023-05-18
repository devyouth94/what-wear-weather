import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

import DailyWeather from '@/_main/components/DailyWeather';
import ImageAuthor from '@/_main/components/ImageAuthor';
import LiveWeather from '@/_main/components/LiveWeather';
import TodayArticle from '@/_main/components/TodayArticle';
import WriteDrawer from '@/_main/components/WriteDrawer';
import LogoHeader from '@/_main/elements/LogoHeader';
import useGeolocation from '@/_main/hooks/useGeolocation';

import ArticleDrawer from '@/@shared/components/ArticleDrawer';
import Layout from '@/@shared/elements/Layout';
import Nav from '@/@shared/elements/Nav';

import { useBackgroundImageState } from '@/stores/useBackgroundImageStore';

const Main = () => {
  const { location } = useGeolocation();
  const { src } = useBackgroundImageState();

  return (
    <>
      <ArticleDrawer />
      <WriteDrawer location={location} />

      <Layout backgroundImage={src}>
        <LogoHeader />
        <LiveWeather location={location} />
        <TodayArticle />
        <DailyWeather location={location} />
        <ImageAuthor />
      </Layout>

      <Nav />
    </>
  );
};

export default Main;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
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
