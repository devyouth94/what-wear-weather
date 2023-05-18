import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import BasicInput from '@/@shared/elements/BasicInput';
import BasicButton from '@/@shared/elements/BasicButton';
import Text from '@/@shared/elements/Text';

import * as S from './index.styles';

const EmailForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit: onSubmit,
  } = useForm<{ email: string }>({ defaultValues: { email: '' }, reValidateMode: 'onChange' });

  const handleClickSubmit = (data: { email: string }) => {
    signIn('email', { email: data.email, callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/main` });
  };

  return (
    <S.EmailForm onSubmit={onSubmit(handleClickSubmit)}>
      <S.MotionContainer initial={{ y: '10px', opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
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
      </S.MotionContainer>

      <BasicButton type="submit" loading={isSubmitting}>
        이메일로 로그인하기
      </BasicButton>
    </S.EmailForm>
  );
};

export default EmailForm;
