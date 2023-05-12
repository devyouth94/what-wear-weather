import Text from '@/elements/Text';
import BasicButton from '@/elements/BasicButton';
import ArticleItem from '@/components/ArticleItem';

import useGetTodayArticle from '@/hooks/main/useGetTodayArticle';
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
          <Text variant="head_02">Today&apos;s Wear</Text>
          <ArticleItem {...data.result} />
        </S.TodayWear>
      )}
    </>
  );
};

export default TodayArticle;
