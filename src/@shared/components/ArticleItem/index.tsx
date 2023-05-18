import BasicImage from '@/@shared/elements/BasicImage';
import Text from '@/@shared/elements/Text';

import { longNowTime } from '@/utils/timeCalculate';
import { useDrawerActions } from '@/stores/useDrawerStore';
import type { TGetArticle } from '@/types/articleTypes';

import * as S from './index.styles';

const ArticleItem = ({ ...article }: TGetArticle) => {
  const { changeSelectedId } = useDrawerActions();

  const now = longNowTime(article.createdAt).split('일');
  const date = `${now[0]}일`;
  const time = now[1];

  return (
    <BasicImage src={article.image} handleClickImage={() => changeSelectedId(article.id)}>
      <S.ArticleInfo>
        <Text variant="head_02">{article.temp_now}&#8451;</Text>
        <div>
          <Text variant="caption">{date}</Text>
          <Text variant="caption">{time}</Text>
        </div>
      </S.ArticleInfo>
    </BasicImage>
  );
};

export default ArticleItem;
