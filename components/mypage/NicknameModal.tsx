import instance from '@/lib/utils/instance';
import { useModalActions, useNicknameModalState } from '@/store/useModalStore';
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

type Props = {
  nickname: string;
};

const NicknameModal = ({ nickname }: Props) => {
  const nicknameModal = useNicknameModalState();
  const { changeModalState } = useModalActions();

  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit: onSubmit,
  } = useForm({ defaultValues: { nickname } });

  const handleSubmit = async (data: { nickname: string }) => {
    try {
      await instance.post('/api/auth/nickname', data);
      await instance.get('api/auth/session?update');

      const event = new Event('visibilitychange');
      document.dispatchEvent(event);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    changeModalState('nickname');
  };

  return (
    <>
      <Modal isCentered isOpen={nicknameModal} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="lg">닉네임 변경</ModalHeader>
          <ModalBody>
            <form id="nickname-form" onSubmit={onSubmit(handleSubmit)}>
              <FormControl isInvalid={!!errors.nickname}>
                <Input
                  id="nickname"
                  type="text"
                  placeholder="닉네임을 입력해주세요."
                  {...register('nickname', {
                    required: '닉네임은 필수 입력입니다.',
                    pattern: {
                      value: /^[a-zA-Z가-힣]{4,10}$/,
                      message: '4~10자의 영문 대소문자, 한글만 가능합니다.',
                    },
                    minLength: { value: 4, message: '닉네임은 4자 이상입니다.' },
                    maxLength: { value: 10, message: '닉네임은 10자 이하입니다.' },
                  })}
                />
                <FormErrorMessage>{errors.nickname && errors.nickname.message}</FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              form="nickname-form"
              mr={3}
              colorScheme="red"
              isDisabled={nickname === watch('nickname')}
              isLoading={isSubmitting}>
              변경
            </Button>
            <Button variant="ghost" onClick={handleClose}>
              취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NicknameModal;
