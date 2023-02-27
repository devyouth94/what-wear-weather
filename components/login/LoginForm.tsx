import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Collapse, Input, useDisclosure } from '@chakra-ui/react';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';

import EmailButton from '@/components/login/EmailButton';
import KakaoButton from '@/components/login/KakaoButton';
import NaverButton from '@/components/login/NaverButton';
import type { LoginData } from '@/lib/constants/types';

const LoginForm = () => {
  const { isOpen, onOpen } = useDisclosure();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit: onSubmit,
  } = useForm<LoginData>({ defaultValues: { email: '' }, reValidateMode: 'onSubmit' });

  const handleSubmit = (data: LoginData) => {
    signIn('email', { email: data.email, callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/main` });
  };

  return (
    <div className="w-full mt-10">
      <Collapse in={isOpen} animateOpacity>
        <form className="mx-[1px]" id="login-form" onSubmit={onSubmit(handleSubmit)}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">이메일</FormLabel>
            <Input
              id="email"
              type="text"
              placeholder="이메일을 입력해주세요."
              {...register('email', {
                required: '이메일은 필수 입력입니다.',
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: '이메일 형식이 아닙니다.',
                },
              })}
            />
            <FormErrorMessage className="mb-1">
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
        </form>
      </Collapse>

      <EmailButton isOpen={isOpen} onOpen={onOpen} isSubmitting={isSubmitting} />

      <KakaoButton />

      <NaverButton />
    </div>
  );
};

export default LoginForm;
