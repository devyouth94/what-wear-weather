import React, { ForwardRefRenderFunction, TextareaHTMLAttributes } from 'react';

import * as S from './index.styles';

const BasicTextarea: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ ...props }, ref) => {
  return <S.BasicTextarea {...props} ref={ref} />;
};

export default React.forwardRef(BasicTextarea);
