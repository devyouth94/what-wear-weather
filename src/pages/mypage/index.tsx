import type { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';

import NicknameModal from '@/components/common/NicknameModal';
import ProfileImgModal from '@/components/mypage/ProfileImgModal';
import SettingDrawer from '@/components/mypage/SettingDrawer';

import Layout from '@/components/common/Layout';
import UserInfo from '@/components/mypage/UserInfo';
import FilterButton from '@/components/mypage/FilterButton';
import PostByRecent from '@/components/mypage/PostByRecent';
import PostByTemp from '@/components/mypage/PostByTemp';
import Nav from '@/components/common/Nav';

import useFilterState from '@/hooks/mypage/useFilterState';
import { IconSetting } from '@/static/Icons';
import { useModalActions } from '@/store/useModalStore';

const Mypage = () => {
  const { data: userData } = useSession();

  const { changeModalState } = useModalActions();
  const { filter, handleFilter } = useFilterState();

  return (
    <>
      {userData && <NicknameModal nickname={String(userData.user?.name)} />}
      {userData && <ProfileImgModal initialImg={String(userData.user?.image)} />}
      <SettingDrawer />

      <Layout className="pt-5 pb-24 min-h-screen">
        <IconSetting
          onClick={() => changeModalState('setting')}
          className="absolute top-5 right-5 w-5 cursor-pointer z-10"
        />

        {userData && (
          <UserInfo nickname={String(userData.user?.name)} image={String(userData.user?.image)} />
        )}

        <FilterButton filter={filter} handleFilter={handleFilter} />

        {filter === '최신순' && <PostByRecent />}

        {filter === '온도별 검색하기' && <PostByTemp />}
      </Layout>

      <Nav />
    </>
  );
};

export default Mypage;

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
