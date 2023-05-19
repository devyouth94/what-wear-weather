import { useRouter } from 'next/router';

const useModalHistoryPush = (queryName: string, queryValue: string) => {
  const { push, query } = useRouter();

  const historyPush = () => {
    push({ query: { ...query, [queryName]: queryValue } });
  };

  return { historyPush };
};

export default useModalHistoryPush;
