import { css } from '@emotion/react';
import styled from '@emotion/styled';

import fontTheme from '@/styles/fontTheme';
import type { BasicButtonStyleProps } from './index.types';

export const Button = styled.button<Required<BasicButtonStyleProps>>`
  ${({ theme, color, variant }) => {
    switch (variant) {
      case 'solid': {
        return css`
          background-color: ${theme.colors[color]};

          &:disabled {
            background-color: ${theme.colors.point_02};
          }
        `;
      }
      case 'outline': {
        return css`
          background-color: transparent;
          border: 1px solid ${theme.colors[color]};
        `;
      }
    }
  }}

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 48px;
  border-radius: 12px;

  ${fontTheme.head_04};
  color: ${({ theme, fontColor }) => theme.colors[fontColor]};
`;
