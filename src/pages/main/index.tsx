import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

import WriteDrawer from '@/components/WriteDrawer';
import Layout from '@/elements/Layout';
import Header from '@/components/Header';
import LiveWeather from '@/components/LiveWeather';
import TodayArticle from '@/components/TodayArticle';
import DailyWeather from '@/components/DailyWeather';
import ImageAuthor from '@/components/ImageAuthor';
import Nav from '@/components/Nav';

import useGeolocation from '@/hooks/common/useGeolocation';
import { useBackgroundImageState } from '@/stores/useBackgroundImageStore';
import ArticleDrawer from '@/components/ArticleDrawer';

const Main = () => {
  const { location } = useGeolocation();
  const { src } = useBackgroundImageState();

  return (
    <>
      <ArticleDrawer />
      <WriteDrawer location={location} />

      <Layout backgroundImage={src}>
        <Header />

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
