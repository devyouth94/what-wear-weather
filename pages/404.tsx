import Layout from '@/components/common/Layout';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <Layout className="flex flex-col gap-5 justify-center items-center">
      <span className="font-black text-lg">잘못 오셨군요!</span>

      <Link href="/">
        <Button colorScheme="red">홈으로</Button>
      </Link>
    </Layout>
  );
};

export default NotFound;
