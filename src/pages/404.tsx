// import Layout from '@/components/common/Layout';
import Link from 'next/link';
import styled from '@emotion/styled';

import LogoHeader from '@/_main/elements/LogoHeader';

import BasicButton from '@/@shared/elements/BasicButton';
import Layout from '@/@shared/elements/Layout';
import Text from '@/@shared/elements/Text';

const NotFound = () => {
  return (
    <Layout center>
      <LayoutNotFound>
        <LogoHeader />
        <Text variant="head_04">문제가 있네요</Text>
        <BasicButton variant="outline" fontColor="secondary_01" color="secondary_01">
          <Link href="/">홈으로</Link>
        </BasicButton>
      </LayoutNotFound>
    </Layout>
  );
};

export default NotFound;

export const LayoutNotFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: 100%;
`;
