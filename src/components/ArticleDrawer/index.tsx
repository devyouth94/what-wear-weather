import Image from 'next/image';

import BasicButton from '@/elements/BasicButton';
import Text from '@/elements/Text';
import Drawer from '@/components/Drawer';
import TempInfo from '@/components/TempInfo';

import { useArticleDrawerState, useDrawerActions } from '@/stores/useDrawerStore';
import useGetArticle from '@/hooks/mypage/useGetArticle';
import useDeleteArticle from '@/hooks/common/useDeleteArticle';
import { longNowTime } from '@/utils/timeCalculate';

import * as S from './index.styles';

const ArticleDrawer = () => {
  const { data: articleData } = useGetArticle();
  const { mutate: deleteArticle } = useDeleteArticle();

  const isOpen = useArticleDrawerState();
  const { changeSelectedId } = useDrawerActions();
  const handleClickCloseButton = () => {
    changeSelectedId(null);
  };

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
            <S.TempInfoContainer>
              <div>
                <TempInfo title="현재 온도" value={articleData.temp_now} />
                <TempInfo title="체감 온도" value={articleData.temp_feels} />
                <TempInfo title="최저 온도" value={articleData.temp_min} />
                <TempInfo title="최고 온도" value={articleData.temp_max} />
              </div>
            </S.TempInfoContainer>

            <S.PhotoContainer>
              <div>
                <Image src={articleData.image} alt="article" fill sizes="700px" />
              </div>
            </S.PhotoContainer>

            <Text>{articleData.description}</Text>
          </Drawer.Body>

          <Drawer.Bottom>
            <BasicButton onClick={handleClickDelete}>삭제</BasicButton>
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
