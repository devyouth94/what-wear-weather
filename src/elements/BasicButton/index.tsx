import React, { ButtonHTMLAttributes } from 'react';

import * as S from './index.styles';
import type { BasicButtonProps } from './index.types';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

const BasicButton = ({
  variant = 'solid',
  color = 'point_01',
  fontColor = 'white',
  children,
  ...rest
}: Props & Partial<BasicButtonProps>) => {
  return (
    <S.Button variant={variant} color={color} fontColor={fontColor} {...rest}>
      {children}
    </S.Button>
  );
};

export default BasicButton;
