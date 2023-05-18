import { HTMLAttributes } from 'react';
import * as S from './index.styles';
import type { TextProps } from './index.types';

const Text = ({
  children,
  variant = 'body_02',
  fontColor = 'secondary_01',
  ...rest
}: React.PropsWithChildren<Partial<TextProps>> & HTMLAttributes<HTMLSpanElement>) => {
  return (
    <S.Text variant={variant} fontColor={fontColor} {...rest}>
      {children}
    </S.Text>
  );
};

export default Text;
