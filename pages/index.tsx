import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import FullLogo from '@/components/common/FullLogo';
import Layout from '@/components/common/Layout';

export default function Home() {
  const { status } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    const timer = setTimeout(() => {
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
    <Layout className="flex justify-center items-center will-change-transform">
      <FullLogo />
    </Layout>
  );
}
