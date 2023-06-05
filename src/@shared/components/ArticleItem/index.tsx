import BasicImage from '@/@shared/elements/BasicImage';
import Text from '@/@shared/elements/Text';
import useModalHistoryPush from '@/@shared/hooks/useModalHistoryPush';

import { longNowTime } from '@/utils/timeCalculate';
import type { TGetArticle } from '@/types/articleTypes';

import * as S from './index.styles';

const ArticleItem = ({ ...article }: TGetArticle) => {
  const { historyPush } = useModalHistoryPush('articleId', article.id);

  const now = longNowTime(article.createdAt).split('일');
  const date = `${now[0]}일`;
  const time = now[1];

  const handleClickImage = () => {
    historyPush();
  };

  return (
    <BasicImage src={article.image} handleClickImage={handleClickImage}>
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
