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

import PreviewImage from '@/components/common/PreviewImage';

import instance from '@/lib/utils/instance';
import { IconCamera } from '@/static/Icons';
import { useModalActions, useProfileImgModalState } from '@/store/useModalStore';

type Props = {
  initialImg: string;
};

const ProfileImgModal = ({ initialImg }: Props) => {
  const profileImgModal = useProfileImgModalState();
  const { changeModalState } = useModalActions();

  const toast = useToast();

  const {
    register,
    watch,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit: onSubmit,
  } = useForm<{ image: FileList }>({ mode: 'onChange' });

  const handleSubmit = async (data: { image: FileList }) => {
    const formData = new FormData();
    formData.append('image', data.image[0]);

    try {
      await instance.post('/api/auth/image', formData);
      await instance.get('/api/auth/session?update');

      const event = new Event('visibilitychange');
      document.dispatchEvent(event);

      changeModalState('profileImg');
      toast({
        title: '프로필 이미지 변경 성공!',
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
    changeModalState('profileImg');
    reset();
  };

  return (
    <Modal isCentered isOpen={profileImgModal} onClose={handleClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader fontSize="lg" fontWeight="black">
          프로필 이미지 변경
        </ModalHeader>

        <ModalBody className="flex flex-col gap-5 items-center">
          <PreviewImage watch={watch} initialImg={initialImg} />

          <form id="image-form" onSubmit={onSubmit(handleSubmit)}>
            <FormControl isInvalid={!!errors.image} className="flex flex-col items-center">
              <label
                htmlFor="image-input"
                className="flex w-fit p-3 rounded-full bg-[#b03232] cursor-pointer">
                <IconCamera />
              </label>

              <Input
                hidden
                id="image-input"
                type="file"
                accept="image/*"
                {...register('image', { required: '이미지는 필수입니다.' })}
              />
              <FormErrorMessage>{errors.image && errors.image.message}</FormErrorMessage>
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            form="image-form"
            mr="1"
            bg="#b03232"
            _hover={{ bg: '#932929' }}
            isDisabled={!!errors.image}
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

export default ProfileImgModal;
