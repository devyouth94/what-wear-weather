import React, { ButtonHTMLAttributes } from 'react';

import * as S from './index.styles';
import type { BasicButtonProps } from './index.types';

const BasicButton = ({
  variant = 'solid',
  color = 'point_01',
  fontColor = 'white',
  children,
  ...rest
}: React.PropsWithChildren<Partial<BasicButtonProps>> &
  ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <S.Button variant={variant} color={color} fontColor={fontColor} {...rest}>
      {children}
    </S.Button>
  );
};

export default BasicButton;
