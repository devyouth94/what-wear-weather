import Image from 'next/image';

import Text from '@/elements/Text';

import { longNowTime } from '@/utils/timeCalculate';
import type { TGetArticle } from '@/types/articleTypes';
import * as S from './index.styles';

const ArticleItem = ({ ...article }: TGetArticle) => {
  const now = longNowTime(article.createdAt).split('일');
  const date = `${now[0]}일`;
  const time = now[1];

  return (
    <S.Container>
      <S.ArticleInfo>
        <Text variant="head_02">{article.temp_now}&#8451;</Text>
        <div>
          <Text variant="caption">{date}</Text>
          <Text variant="caption">{time}</Text>
        </div>
      </S.ArticleInfo>
      <Image src={article.image} alt={article.id} fill sizes="600px" priority />
    </S.Container>
  );
};

export default ArticleItem;
