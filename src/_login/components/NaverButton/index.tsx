import { signIn } from 'next-auth/react';

import BasicButton from '@/@shared/elements/BasicButton';

const NaverButton = () => {
  const handleClickNaver = () => {
    signIn('naver', { callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/main` });
  };

  return (
    <BasicButton color="naver" onClick={handleClickNaver}>
      네이버로 로그인하기
    </BasicButton>
  );
};

export default NaverButton;
