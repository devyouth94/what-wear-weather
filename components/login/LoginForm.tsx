import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import type { LoginData } from '@/lib/constants/types';

const LoginForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit: onSubmit,
  } = useForm<LoginData>({ defaultValues: { email: '' } });

  const handleSubmit = (data: LoginData) => {
    signIn('email', { email: data.email, callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/main` });
  };

  const handleClickKakao = () => {
    signIn('kakao', { callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/main` });
  };

  const handleClickNaver = () => {
    signIn('naver', { callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/main` });
  };

  return (
    <>
      <form onSubmit={onSubmit(handleSubmit)}>
        <div>
          <label htmlFor="email">아이디</label>
          <input
            id="email"
            type="text"
            placeholder="이메일을 입력해주세요."
            {...register('email', {
              required: '이메일은 필수 항목입니다.',
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: '이메일 형식이 아닙니다.',
              },
            })}
          />
          {errors.email && <small role="alert">{errors.email.message}</small>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          이메일로 로그인하기
        </button>
      </form>

      <button onClick={handleClickKakao}>카카오 로그인</button>

      <button onClick={handleClickNaver}>네이버 로그인</button>
    </>
  );
};

export default LoginForm;
