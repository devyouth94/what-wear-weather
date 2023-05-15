// import Layout from '@/components/common/Layout';
import Link from 'next/link';

import BasicButton from '@/elements/BasicButton';
import Layout from '@/elements/Layout';
import Text from '@/elements/Text';

const NotFound = () => {
  return (
    <Layout center>
      <Text variant="head_01">Error!</Text>
      <Link href="/" style={{ width: '100%' }}>
        <BasicButton variant="outline" fontColor="secondary_01" color="secondary_01">
          홈으로
        </BasicButton>
      </Link>
    </Layout>
  );
};

export default NotFound;
