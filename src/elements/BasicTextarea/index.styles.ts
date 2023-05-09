import fontTheme from '@/styles/fontTheme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const BasicTextarea = styled.textarea`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.secondary_01};
    color: ${theme.colors.secondary_01};
  `}

  resize: none;

  width: 100%;
  height: 100px;
  padding: 12px;
  background-color: transparent;
  border-radius: 12px;

  ${fontTheme.body_02};
`;
