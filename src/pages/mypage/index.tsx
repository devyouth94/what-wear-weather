import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import MyArticles from '@/_mypage/components/MyArticles';
import SettingModal from '@/_mypage/components/SettingModal';
import ProfileDrawer from '@/_mypage/components/ProfileDrawer';
import UserInfo from '@/_mypage/components/UserInfo';

import ArticleDrawer from '@/@shared/components/ArticleDrawer';
import Layout from '@/@shared/elements/Layout';
import Nav from '@/@shared/elements/Nav';
import Text from '@/@shared/elements/Text';
import useModalHistoryPush from '@/@shared/hooks/useModalHistoryPush';

import { IconDrawer } from '@/statics/icons';

const Mypage = () => {
  const { data, status } = useSession();

  const { historyPush } = useModalHistoryPush('setting', 'on');
  const handleClickSetting = () => {
    historyPush();
  };

  return (
    <>
      <SettingModal />
      <ArticleDrawer />
      {status === 'authenticated' && <ProfileDrawer data={data} />}

      <Layout.Header>
        <Text variant="head_01">마이페이지</Text>
        <IconDrawer onClick={handleClickSetting} />
      </Layout.Header>

      <Layout>
        <UserInfo />
        <MyArticles />
      </Layout>

      <Nav />
    </>
  );
};

export default Mypage;

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
