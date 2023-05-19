import React from 'react';

import * as S from './index.styles';

const ArticleContainer = ({ children }: React.PropsWithChildren) => {
  return <S.ArticleContainer>{children}</S.ArticleContainer>;
};

export default ArticleContainer;
