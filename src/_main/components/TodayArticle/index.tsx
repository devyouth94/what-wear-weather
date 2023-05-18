import ArticleItem from '@/@shared/components/ArticleItem';
import useGetTodayArticle from '@/_main/queries/useGetTodayArticle';

import BasicButton from '@/@shared/elements/BasicButton';
import { useDrawerActions } from '@/stores/useDrawerStore';

import * as S from './index.styles';

const TodayArticle = () => {
  const { data } = useGetTodayArticle();

  const { changeDrawerState } = useDrawerActions();
  const handleClickWriteButton = () => {
    changeDrawerState('write');
  };

  return (
    <>
      {data && data.ok && (
        <BasicButton onClick={handleClickWriteButton}>오늘의 옷 등록하기</BasicButton>
      )}

      {data && data.result && (
        <S.TodayWear>
          <S.TodayWearText variant="head_02">Today&apos;s Wear</S.TodayWearText>
          <ArticleItem {...data.result} />
        </S.TodayWear>
      )}
    </>
  );
};

export default TodayArticle;
