import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import Text from '@/elements/Text';
import BasicInput from '@/elements/BasicInput';
import BasicButton from '@/elements/BasicButton';

import * as S from './index.styles';

const LoginForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit: onSubmit,
  } = useForm<{ email: string }>({ defaultValues: { email: '' }, reValidateMode: 'onChange' });

  const handleClickSubmit = (data: { email: string }) => {
    signIn('email', { email: data.email, callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/main` });
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleClickEmail = () => {
    setIsOpen(true);
  };

  const handleClickKakao = () => {
    signIn('kakao', { callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/main` });
  };

  const handleClickNaver = () => {
    signIn('naver', { callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/main` });
  };

  return (
    <>
      <S.LoginButtonContainer>
        {isOpen ? (
          <S.EmailFormContainer onSubmit={onSubmit(handleClickSubmit)}>
            <Text variant="head_03">이메일</Text>

            <BasicInput
              placeholder="이메일을 입력해주세요."
              {...register('email', {
                required: '이메일은 필수 입력입니다.',
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: '이메일 형식이 아닙니다.',
                },
              })}
            />

            {errors.email && (
              <Text variant="caption" fontColor="danger">
                {errors.email.message}
              </Text>
            )}

            <BasicButton type="submit" disabled={isSubmitting}>
              이메일로 로그인하기
            </BasicButton>
          </S.EmailFormContainer>
        ) : (
          <BasicButton onClick={handleClickEmail}>이메일로 로그인하기</BasicButton>
        )}

        <BasicButton color="kakao" fontColor="main_01" onClick={handleClickKakao}>
          카카오로 로그인하기
        </BasicButton>

        <BasicButton color="naver" onClick={handleClickNaver}>
          네이버로 로그인하기
        </BasicButton>
      </S.LoginButtonContainer>
    </>
  );
};

export default LoginForm;
