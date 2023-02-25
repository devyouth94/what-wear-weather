import { Button } from '@chakra-ui/react';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  isSubmitting: boolean;
};

const EmailButton = ({ isOpen, onOpen, isSubmitting }: Props) => {
  return (
    <>
      {isOpen ? (
        <Button
          type="submit"
          form="login-form"
          isLoading={isSubmitting}
          width="100%"
          fontSize="15px"
          size="lg"
          bg="#b03232"
          _hover={{ bg: '#932929' }}
          className="mt-1 text-white">
          이메일로 로그인하기
        </Button>
      ) : (
        <Button
          width="100%"
          fontSize="15px"
          size="lg"
          bg="#b03232"
          _hover={{ bg: '#932929' }}
          className="mt-3 text-white"
          onClick={onOpen}>
          이메일로 로그인하기
        </Button>
      )}
    </>
  );
};

export default EmailButton;
