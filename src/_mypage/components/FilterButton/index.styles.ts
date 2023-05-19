import styled from '@emotion/styled';
import { css } from '@emotion/react';

import fontTheme from '@/styles/fontTheme';

export const ButtonContainer = styled.div`
  position: sticky;
  top: 80px;
  z-index: 9;

  display: flex;

  width: calc(100% + 40px);
  margin-left: -20px;
  background-color: ${({ theme }) => theme.colors.main_01};
`;

export const Button = styled.button<{ select: boolean }>`
  height: 40px;
  width: 100%;

  ${fontTheme.head_04};
  color: ${({ theme }) => theme.colors.secondary_01};

  ${({ theme, select }) =>
    select &&
    css`
      border-bottom: 2px solid ${theme.colors.secondary_01};
      box-sizing: content-box;
    `}
`;
