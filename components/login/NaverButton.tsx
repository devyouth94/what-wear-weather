import { signIn } from 'next-auth/react';
import { Button } from '@chakra-ui/react';

const NaverButton = () => {
  const handleClickNaver = () => {
    signIn('naver', { callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/main` });
  };

  return (
    <Button
      width="100%"
      fontSize="15px"
      size="lg"
      bg="#2DB400"
      _hover={{ bg: '#31a50a' }}
      className="mt-3 text-white"
      onClick={handleClickNaver}>
      네이버로 로그인하기
    </Button>
  );
};

export default NaverButton;
