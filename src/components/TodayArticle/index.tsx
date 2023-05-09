import BasicButton from '@/elements/BasicButton';
import useGetTodayArticle from '@/hooks/main/useGetTodayArticle';
import { useDrawerActions } from '@/stores/useDrawerStore';

const TodayArticle = () => {
  const { data } = useGetTodayArticle();

  const { changeDrawerState } = useDrawerActions();
  const handleClickWriteButton = () => {
    changeDrawerState('write');
  };

  return (
    <>
      {data?.ok ? (
        <BasicButton onClick={handleClickWriteButton}>오늘의 옷 등록하기</BasicButton>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default TodayArticle;
