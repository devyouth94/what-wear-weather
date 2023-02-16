import { useForm } from 'react-hook-form';
import type { RegisterData } from '@/lib/constants/types';

interface Props {
  handleSubmit: (data: RegisterData) => Promise<void>;
  handleConfirmData: (type: string, userData: string) => Promise<boolean>;
}

const RegisterForm = ({ handleSubmit, handleConfirmData }: Props) => {
  const {
    register,
    getValues,
    formState: { errors, isSubmitting },
    handleSubmit: onSubmit,
  } = useForm<RegisterData>({
    mode: 'onBlur',
    defaultValues: { userId: '', nickname: '', password: '', confirmPassword: '' },
  });

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <div>
        <label htmlFor="userId">아이디</label>
        <input
          id="userId"
          type="text"
          placeholder="아이디를 입력해주세요."
          {...register('userId', {
            required: '아이디는 필수 입력입니다.',
            pattern: {
              value: /^[a-zA-Z0-9]{6,20}$/,
              message: '6~20자의 영문 대소문자, 숫자만 사용 가능합니다.',
            },
            minLength: { value: 6, message: '아이디는 6자 이상입니다.' },
            maxLength: { value: 20, message: '아이디는 20자 이하입니다.' },
            validate: (value) =>
              handleConfirmData('userId', value).then(
                (data) => data || '이미 사용중인 아이디입니다.',
              ),
          })}
        />
        {errors.userId && <small>{errors.userId.message}</small>}
      </div>

      <div>
        <label htmlFor="nickname">닉네임</label>
        <input
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
            validate: (value) =>
              handleConfirmData('nickname', value).then(
                (data) => data || '이미 사용중인 닉네임입니다.',
              ),
          })}
        />
        {errors.nickname && <small>{errors.nickname.message}</small>}
      </div>

      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          {...register('password', {
            required: '비밀번호는 필수 입력입니다.',
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: '8자 이상, 알파벳과 숫자를 모두 포함하여야 합니다.',
            },
            minLength: { value: 8, message: '비밀번호는 8자 이상입니다.' },
          })}
        />
        {errors.password && <small>{errors.password.message}</small>}
      </div>

      <div>
        <label htmlFor="confirmPassword">비밀번호</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          {...register('confirmPassword', {
            required: '비밀번호 확인은 필수 입력입니다.',
            validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다.',
          })}
        />
        {errors.confirmPassword && <small>{errors.confirmPassword.message}</small>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        회원가입
      </button>
    </form>
  );
};

export default RegisterForm;
