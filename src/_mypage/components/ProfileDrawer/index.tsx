import { useForm } from 'react-hook-form';
import type { Session } from 'next-auth';

import ProfileImage from '@/_mypage/elements/ProfileImage';
import usePostProfile from '@/_mypage/queries/usePostProfile';

import BasicButton from '@/@shared/elements/BasicButton';
import BasicInput from '@/@shared/elements/BasicInput';
import Drawer from '@/@shared/elements/Drawer';
import Text from '@/@shared/elements/Text';
import useModalHistoryBack from '@/@shared/hooks/useModalHistoryBack';
import { IconUpload } from '@/statics/icons';
import type { TProfileForm } from '@/types/articleTypes';

import * as S from './index.styles';

interface Props {
  data: Session | null;
}

const ProfileDrawer = ({ data }: Props) => {
  const {
    register,
    watch,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit: onSubmit,
  } = useForm<TProfileForm>({
    defaultValues: { nickname: String(data?.user?.name), image: null },
  });

  const { query, handleClickCloseButton } = useModalHistoryBack('profile', () => {
    reset();
  });
  const isOpen = query === 'on';

  const imageFile = watch('image');
  const { mutate: postProfile, status: postProfileStatus } = usePostProfile();
  const handleSubmit = (data: TProfileForm) => {
    postProfile({ nickname: data.nickname, image: data.image ? data.image[0] : null });
  };

  return (
    <Drawer open={isOpen} onClose={handleClickCloseButton}>
      <Drawer.Header>프로필 설정</Drawer.Header>

      <Drawer.Body>
        <S.TextContainer>
          <Text variant="head_03">이메일</Text>
          <Text>{data?.user?.email}</Text>
        </S.TextContainer>

        <S.TextContainer>
          <Text variant="head_03">닉네임</Text>
          <BasicInput
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
          {errors.nickname && (
            <Text variant="caption" fontColor="point_01">
              {errors.nickname.message}
            </Text>
          )}
        </S.TextContainer>

        <S.ProfileContainer>
          <Text variant="head_03">프로필 사진</Text>
          <div>
            {imageFile ? (
              <ProfileImage src={URL.createObjectURL(imageFile[0])} />
            ) : (
              <ProfileImage src={data?.user?.image || ''} />
            )}

            <label htmlFor="profile-image-input">
              <IconUpload />
            </label>
            <BasicInput
              hidden
              id="profile-image-input"
              type="file"
              accept="image/*"
              {...register('image')}
            />
          </div>
        </S.ProfileContainer>
      </Drawer.Body>

      <Drawer.Bottom>
        <BasicButton
          loading={isSubmitting || postProfileStatus === 'loading'}
          disabled={data?.user?.name === watch('nickname') && !(imageFile && imageFile[0])}
          onClick={onSubmit(handleSubmit)}>
          완료
        </BasicButton>
        <BasicButton
          onClick={handleClickCloseButton}
          variant="outline"
          color="secondary_01"
          fontColor="secondary_01">
          닫기
        </BasicButton>
      </Drawer.Bottom>
    </Drawer>
  );
};

export default ProfileDrawer;
