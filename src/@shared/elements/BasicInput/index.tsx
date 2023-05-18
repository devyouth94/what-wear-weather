import React, { ForwardRefRenderFunction, InputHTMLAttributes } from 'react';

import * as S from './index.styles';

const BasicInput: ForwardRefRenderFunction<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
> = ({ ...props }, ref) => {
  return <S.BasicInput {...props} ref={ref} />;
};

export default React.forwardRef(BasicInput);
