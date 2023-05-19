import BasicButton from '@/@shared/elements/BasicButton';
import BasicImage from '@/@shared/elements/BasicImage';
import Drawer from '@/@shared/elements/Drawer';
import TempInfo from '@/@shared/elements/TempInfo';
import Text from '@/@shared/elements/Text';
import useGetArticle from '@/@shared/hooks/useGetArticle';
import useDeleteArticle from '@/@shared/hooks/useDeleteArticle';
import useModalHistoryBack from '@/@shared/hooks/useModalHistoryBack';

import { useArticleDrawerState, useDrawerActions } from '@/stores/useDrawerStore';
import { longNowTime } from '@/utils/timeCalculate';

import * as S from './index.styles';

const ArticleDrawer = () => {
  const { data: articleData } = useGetArticle();
  const { mutate: deleteArticle, status: deleteArticleStatus } = useDeleteArticle();

  const isOpen = useArticleDrawerState();
  const { changeSelectedId } = useDrawerActions();
  const { handleClickCloseButton } = useModalHistoryBack('articleId', () => changeSelectedId(null));

  const handleClickDelete = () => {
    if (!articleData) return;
    deleteArticle(articleData.id);
  };

  return (
    <>
      {articleData && (
        <Drawer isOpen={!!isOpen}>
          <Drawer.Header>{longNowTime(articleData.createdAt).split('일')[0]}일</Drawer.Header>

          <Drawer.Body>
            <div>
              <BasicImage src={articleData.image} />
            </div>

            <S.TempInfoContainer>
              <Text variant="head_03">그날의 온도</Text>
              <div>
                <TempInfo title="저장 온도" value={articleData.temp_now} />
                <TempInfo title="체감 온도" value={articleData.temp_feels} />
                <TempInfo title="최저 온도" value={articleData.temp_min} />
                <TempInfo title="최고 온도" value={articleData.temp_max} />
              </div>
            </S.TempInfoContainer>

            <S.TextContainer>
              <Text variant="head_03">그날의 기록</Text>
              <Text>{articleData.description}</Text>
            </S.TextContainer>
          </Drawer.Body>

          <Drawer.Bottom>
            <BasicButton onClick={handleClickDelete} loading={deleteArticleStatus === 'loading'}>
              삭제
            </BasicButton>
            <BasicButton
              onClick={handleClickCloseButton}
              variant="outline"
              color="secondary_01"
              fontColor="secondary_01">
              닫기
            </BasicButton>
          </Drawer.Bottom>
        </Drawer>
      )}
    </>
  );
};

export default ArticleDrawer;
