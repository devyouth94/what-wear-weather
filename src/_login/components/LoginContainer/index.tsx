import { useState } from 'react';

import EmailForm from '@/_login/components/EmailForm';
import KakaoButton from '@/_login/components/KakaoButton';
import NaverButton from '@/_login/components/NaverButton';

import BasicButton from '@/@shared/elements/BasicButton';

import * as S from './index.styles';

const LoginContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickEmail = () => {
    setIsOpen(true);
  };

  return (
    <S.LoginContainer>
      {isOpen ? (
        <EmailForm />
      ) : (
        <BasicButton onClick={handleClickEmail}>이메일로 로그인하기</BasicButton>
      )}

      <KakaoButton />
      <NaverButton />
    </S.LoginContainer>
  );
};

export default LoginContainer;
