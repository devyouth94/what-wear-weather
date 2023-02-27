import { signIn } from 'next-auth/react';
import { Button } from '@chakra-ui/react';

const KakaoButton = () => {
  const handleClickKakao = () => {
    signIn('kakao', { callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/main` });
  };

  return (
    <Button
      width="100%"
      fontSize="15px"
      size="lg"
      bg="#FEE500"
      _hover={{ bg: '#eed814' }}
      className="mt-3"
      onClick={handleClickKakao}>
      카카오로 로그인하기
    </Button>
  );
};

export default KakaoButton;
