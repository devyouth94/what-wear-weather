import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Spinner } from '@chakra-ui/react';

import MotionFullLogo from '@/components/common/MotionFullLogo';
import Layout from '@/components/common/Layout';

export default function Home() {
  const { status } = useSession();
  const { push } = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;

    const timer = setTimeout(() => {
      setIsOpen(true);

      if (status === 'authenticated') {
        push('/main');
      }

      if (status === 'unauthenticated') {
        push('/login');
      }
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [status]);

  return (
    <>
      {isOpen && (
        <div className="absolute flex justify-center items-center bg-black/50 w-full z-20 min-h-screen">
          <Spinner thickness="6px" speed="0.65s" emptyColor="gray.200" color="red.500" size="xl" />
        </div>
      )}

      <Layout className="flex justify-center items-center h-screen">
        <MotionFullLogo />
      </Layout>
    </>
  );
}
