import Image from 'next/image';
import * as S from './index.styles';

interface Props {
  src: string;
}

const ProfileImage = ({ src }: Props) => {
  return (
    <S.ProfileContainer>
      <Image src={src || '/images/default-user.png'} fill alt="profile" sizes="64px" />
    </S.ProfileContainer>
  );
};

export default ProfileImage;
