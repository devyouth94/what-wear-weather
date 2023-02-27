import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Button, FormControl, FormErrorMessage, Input, useToast } from '@chakra-ui/react';

import instance from '@/lib/utils/instance';
import { useModalActions, useNicknameModalState } from '@/store/useModalStore';

type Props = {
  nickname: string;
  description?: string;
};

const NicknameModal = ({ nickname, description }: Props) => {
  const nicknameModal = useNicknameModalState();
  const { changeModalState } = useModalActions();

  const toast = useToast();

  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit: onSubmit,
  } = useForm({ defaultValues: { nickname } });

  const handleSubmit = async (data: { nickname: string }) => {
    try {
      await instance.post('/api/auth/nickname', data);
      await instance.get('/api/auth/session?update');

      const event = new Event('visibilitychange');
      document.dispatchEvent(event);

      handleClose();
      toast({
        title: '닉네임 변경 성공!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: '오류가 발생했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleClose = () => {
    changeModalState('nickname');
  };

  return (
    <Modal isCentered isOpen={nicknameModal} onClose={handleClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader fontSize="lg" fontWeight="black">
          닉네임 변경
        </ModalHeader>

        <ModalBody>
          {description && <span className="flex mb-2 text-sm font-semibold">{description}</span>}

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
            mr="1"
            bg="#b03232"
            _hover={{ bg: '#932929' }}
            isDisabled={nickname === watch('nickname')}
            isLoading={isSubmitting}
            className="text-white">
            변경
          </Button>

          <Button variant="ghost" onClick={handleClose}>
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NicknameModal;
