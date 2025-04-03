'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import Main from '~/src/components/layout/main';
import LogoLarge from '~/src/components/logo-large';
import Overlay from '~/src/components/overlay';
import { MESSAGE } from '~/src/constants/message';
import { createClient } from '~/src/utils/supabase/client';

const Home = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    (async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();

        timer = setTimeout(() => {
          setIsLoading(true);

          if (data.user) {
            router.push('/weather');
          } else {
            router.push('/login');
          }
        }, 2000);
      } catch (error) {
        toast.error(MESSAGE.ERROR.초기화면);
        console.error(error);

        timer = setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    })();

    return () => {
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <>
      <Overlay visible={isLoading} loader />

      <Main className="flex h-dvh items-center justify-center">
        <LogoLarge />
      </Main>
    </>
  );
};

export default Home;
