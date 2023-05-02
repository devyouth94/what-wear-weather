import React, { HTMLAttributes } from 'react';

import * as S from './index.styles';

const BasicInput = (
  { ...attribute }: HTMLAttributes<HTMLInputElement>,
  forwardedRef: React.Ref<HTMLInputElement>,
) => {
  return <S.BasicInput {...attribute} ref={forwardedRef} />;
};

export default React.forwardRef(BasicInput);
