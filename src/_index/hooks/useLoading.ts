import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const useLoading = () => {
  const { status } = useSession();
  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);

      if (status === 'authenticated') {
        push('/main');
      }

      if (status === 'unauthenticated') {
        push('/login');
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [status]);

  return isLoading;
};

export default useLoading;
