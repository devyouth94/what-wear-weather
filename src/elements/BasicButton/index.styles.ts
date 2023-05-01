import { css } from '@emotion/react';
import styled from '@emotion/styled';

import fontTheme from '@/styles/fontTheme';
import type { BasicButtonProps } from './index.types';

export const Button = styled.button<Required<BasicButtonProps>>`
  ${({ theme, color, variant }) => {
    switch (variant) {
      case 'solid': {
        return css`
          background-color: ${theme.colors[color]};
        `;
      }
      case 'outline': {
        return css`
          background-color: transparent;
          border-width: 1px;
          border-color: ${theme.colors[color]};
        `;
      }
    }
  }}

  width: 100%;
  height: 48px;
  border-radius: 12px;

  ${fontTheme.head_04};
  color: ${({ theme, fontColor }) => theme.colors[fontColor]};
`;
