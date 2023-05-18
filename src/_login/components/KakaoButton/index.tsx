import { signIn } from 'next-auth/react';

import BasicButton from '@/@shared/elements/BasicButton';

const KakaoButton = () => {
  const handleClickKakao = () => {
    signIn('kakao', { callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/main` });
  };

  return (
    <BasicButton color="kakao" fontColor="main_01" onClick={handleClickKakao}>
      카카오로 로그인하기
    </BasicButton>
  );
};

export default KakaoButton;
