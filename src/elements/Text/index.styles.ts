import styled from '@emotion/styled';

import fontTheme from '@/styles/fontTheme';
import type { TextProps } from './index.types';

export const Text = styled.span<Required<TextProps>>`
  ${({ variant }) => fontTheme[variant]};
  color: ${({ theme, fontColor }) => theme.colors[fontColor]};

  a {
    text-decoration: underline;
  }
`;
