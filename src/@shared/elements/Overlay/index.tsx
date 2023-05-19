import { HTMLAttributes } from 'react';

import * as S from './index.styles';

const Overlay = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <S.Overlay {...props} />;
};

export default Overlay;
