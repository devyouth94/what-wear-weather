import { useSession } from 'next-auth/react';

import ProfileImage from '@/components/ProfileImage';
import Text from '@/elements/Text';

import * as S from './index.styles';

const UserInfo = () => {
  const { data } = useSession();

  return (
    <>
      {data && (
        <S.Container>
          <ProfileImage src={data.user?.image || ''} />

          <S.TextContainer>
            <Text variant="head_03">{data.user?.name}님, 안녕하세요!</Text>
            <Text variant="caption" fontColor="main_04">
              {data.user?.email}
            </Text>
          </S.TextContainer>
        </S.Container>
      )}
    </>
  );
};

export default UserInfo;
