import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useModalHistoryBack = (queryName: string, modalControlFunction?: () => void) => {
  const { query, events, back } = useRouter();

  const handleClickCloseButton = () => {
    modalControlFunction;
    back();
  };

  const handleClickHistoryBack = () => {
    if (!query[queryName]) return;
    if (modalControlFunction) {
      modalControlFunction();
    }
  };

  useEffect(() => {
    events.on('routeChangeStart', handleClickHistoryBack);
    return () => {
      events.off('routeChangeStart', handleClickHistoryBack);
    };
  }, [query[queryName]]);

  return { query: query[queryName], handleClickCloseButton };
};

export default useModalHistoryBack;
