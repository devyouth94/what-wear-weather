// import Layout from '@/components/common/Layout';
import Link from 'next/link';

import LogoHeader from '@/_main/elements/LogoHeader';

import BasicButton from '@/@shared/elements/BasicButton';
import Text from '@/@shared/elements/Text';

import * as S from './index.styles';
import Layout from '@/@shared/elements/Layout';

const NotFound = () => {
  return (
    <Layout center>
      <S.LayoutNotFound>
        <LogoHeader />
        <Text variant="head_04">문제가 있네요</Text>
        <BasicButton variant="outline" fontColor="secondary_01" color="secondary_01">
          <Link href="/">홈으로</Link>
        </BasicButton>
      </S.LayoutNotFound>
    </Layout>
  );
};

export default NotFound;
