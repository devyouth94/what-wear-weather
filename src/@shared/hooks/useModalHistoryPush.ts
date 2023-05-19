import { useRouter } from 'next/router';

const useModalHistoryPush = (queryName: string, queryValue: string) => {
  const { push, query } = useRouter();

  const historyPush = () => {
    push({ query: { ...query, [queryName]: queryValue } }, undefined, { scroll: false });
  };

  return { historyPush };
};

export default useModalHistoryPush;
