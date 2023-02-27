import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

import NicknameModal from '@/components/common/NicknameModal';

import useModalStore from '@/store/useModalStore';

const NullNickname = () => {
  const { data: userData } = useSession();

  useEffect(() => {
    if (userData && !userData.user?.name) {
      useModalStore.setState({ nickname: true });
    }
  }, []);

  return (
    <>
      {userData && (
        <NicknameModal nickname="" description="닉네임이 없네요! 닉네임을 먼저 설정해주세요." />
      )}
    </>
  );
};

export default NullNickname;
