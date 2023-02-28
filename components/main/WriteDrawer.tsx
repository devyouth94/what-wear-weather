import { useForm } from 'react-hook-form';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { Button, FormControl, FormErrorMessage, Input, Textarea, useToast } from '@chakra-ui/react';

import PreviewImage from '@/components/common/PreviewImage';
import CardTempInfo from '@/components/common/CardTempInfo';

import usePostFile from '@/hooks/main/usePostFile';
import useGetTodayPost from '@/hooks/main/useGetTodayPost';
import type { CityName, SubmitData } from '@/lib/constants/types';
import { useModalActions, useWriteDrawerState } from '@/store/useModalStore';
import { IconCamera } from '@/static/Icons';

type Props = {
  region: CityName;
  temp_now: number;
  temp_feels: number;
  temp_min: number;
  temp_max: number;
};

const WriteDrawer = ({ region, temp_now, temp_feels, temp_min, temp_max }: Props) => {
  const writeDrawer = useWriteDrawerState();
  const { changeModalState } = useModalActions();

  const toast = useToast();

  const { mutate: postFile, status } = usePostFile();
  const { refetch } = useGetTodayPost();

  const {
    register,
    watch,
    reset,
    handleSubmit: onSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SubmitData>({
    defaultValues: {
      description: '',
    },
  });

  const handleSubmit = (data: SubmitData) => {
    postFile(
      {
        region: region.ko || region.en,
        temp_now,
        temp_feels,
        temp_min,
        temp_max,
        description: data.description,
        image: data.image[0],
      },
      {
        onSuccess: () => {
          changeModalState('write');
          toast({
            title: '오늘의 옷장 등록 성공!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          refetch();
        },
        onError: () => {
          toast({
            title: '오류가 발생했습니다.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        },
      },
    );
    reset();
  };

  const handleClose = () => {
    changeModalState('write');
    reset();
  };

  return (
    <Drawer size="lg" placement="bottom" isOpen={writeDrawer} onClose={handleClose}>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader fontWeight="black" borderBottomWidth="1px">
          오늘의 옷 등록하기
        </DrawerHeader>

        <DrawerBody className="flex flex-col items-center">
          <PreviewImage watch={watch} />

          <div className="mt-5 grid-cols-5 flex w-full">
            <CardTempInfo title="위치" region={region.ko || region.en} />
            <CardTempInfo title="기온" temp={temp_now} />
            <CardTempInfo title="체감" temp={temp_feels} />
            <CardTempInfo title="최저" temp={temp_min} />
            <CardTempInfo title="최고" temp={temp_max} />
          </div>

          <form
            className="flex flex-col gap-3 w-full mt-3"
            id="write-wear"
            onSubmit={onSubmit(handleSubmit)}>
            <FormControl className="flex flex-col items-center" isInvalid={!!errors.image}>
              <label
                htmlFor="write-image-input"
                className="flex w-fit p-3 rounded-full bg-[#b03232] cursor-pointer">
                <IconCamera />
              </label>
              <Input
                hidden
                id="write-image-input"
                type="file"
                accept="image/*"
                {...register('image', { required: '이미지는 필수입니다.' })}
              />
              <FormErrorMessage>{errors.image && errors.image.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.description}>
              <Textarea
                resize="none"
                size="sm"
                placeholder="기록해보세요.(60자 이내)"
                {...register('description', {
                  maxLength: { value: 60, message: '60자 이내로 작성해주세요.' },
                })}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
          </form>
        </DrawerBody>

        <DrawerFooter>
          <Button
            type="submit"
            form="write-wear"
            mr="1"
            bg="#b03232"
            _hover={{ bg: '#932929' }}
            isDisabled={!!errors.image || !!errors.description}
            isLoading={isSubmitting || status === 'loading'}
            className="text-white">
            등록
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default WriteDrawer;
