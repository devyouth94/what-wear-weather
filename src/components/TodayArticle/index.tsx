import BasicButton from '@/elements/BasicButton';
import useGetTodayArticle from '@/hooks/main/useGetTodayArticle';

const TodayArticle = () => {
  const { data } = useGetTodayArticle();

  return <BasicButton>오늘의 옷 등록하기</BasicButton>;
};

export default TodayArticle;
