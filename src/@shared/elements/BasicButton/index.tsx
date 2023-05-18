import React, { ButtonHTMLAttributes } from 'react';

import * as S from './index.styles';
import type { BasicButtonProps } from './index.types';
import Spinner from '../Spinner';

const BasicButton = ({
  variant = 'solid',
  color = 'point_01',
  fontColor = 'white',
  loading = false,
  disabled = false,
  children,
  ...rest
}: React.PropsWithChildren<Partial<BasicButtonProps>> &
  ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <S.Button
      variant={variant}
      color={color}
      fontColor={fontColor}
      disabled={loading || disabled}
      {...rest}>
      {loading ? <Spinner size={5} /> : children}
    </S.Button>
  );
};

export default BasicButton;
