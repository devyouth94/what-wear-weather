import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import Layout from '@/elements/Layout';
import FullLogo from '@/elements/FullLogo';

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
      <Layout center>
        <FullLogo />
      </Layout>
    </>
  );
}
