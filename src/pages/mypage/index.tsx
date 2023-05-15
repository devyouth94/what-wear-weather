import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import SettingModal from '@/components/SettingModal';
import ProfileDrawer from '@/components/ProfileDrawer';
import Layout from '@/elements/Layout';
import Text from '@/elements/Text';
import UserInfo from '@/components/UserInfo';
import MyArticles from '@/components/MyArticles';
import Nav from '@/components/Nav';

import { IconDrawer } from '@/statics/icons';
import { useModalActions } from '@/stores/useModalStore';
import ArticleDrawer from '@/components/ArticleDrawer';

const Mypage = () => {
  const { data, status } = useSession();
  const { changeModalState } = useModalActions();

  return (
    <>
      <SettingModal />
      <ArticleDrawer />
      {status === 'authenticated' && <ProfileDrawer data={data} />}

      <Layout.Header>
        <Text variant="head_01">마이페이지</Text>
        <IconDrawer onClick={() => changeModalState('setting')} />
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
