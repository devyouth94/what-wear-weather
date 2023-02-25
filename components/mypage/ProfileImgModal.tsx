import instance from '@/lib/utils/instance';
import { useModalActions, useProfileImgModalState } from '@/store/useModalStore';
import {
  Button,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import PreviewImage from '../main/PreviewImage';

type Props = {
  initialImg: string;
};

const ProfileImgModal = ({ initialImg }: Props) => {
  const profileImgModal = useProfileImgModalState();
  const { changeModalState } = useModalActions();

  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit: onSubmit,
  } = useForm<{ image: FileList }>();

  const handleSubmit = async (data: { image: FileList }) => {
    const formData = new FormData();

    formData.append('image', data.image[0]);

    try {
      await instance.post('/api/auth/image', formData);
      await instance.get('api/auth/session?update');

      const event = new Event('visibilitychange');
      document.dispatchEvent(event);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    changeModalState('profileImg');
  };

  return (
    <>
      <Modal isCentered isOpen={profileImgModal} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="lg">프로필 이미지 변경</ModalHeader>
          <ModalBody>
            <PreviewImage watch={watch} initialImg={initialImg} />
            <form id="image-form" onSubmit={onSubmit(handleSubmit)}>
              <FormControl isInvalid={!!errors.image}>
                <input
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
              mr={3}
              colorScheme="red"
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

export default ProfileImgModal;
