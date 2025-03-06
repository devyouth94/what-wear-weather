'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import LogoLarge from '~/src/components/logo-large';
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
        console.log('에러가 발생했어요. 로그인 페이지로 이동합니다.: ', error);

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
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30">
          <span>Loading...</span>
        </div>
      )}

      <div className="flex h-dvh w-full items-center justify-center">
        <LogoLarge />
      </div>
    </>
  );
};

export default Home;
