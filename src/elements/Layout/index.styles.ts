import styled from '@emotion/styled';
import { css } from '@emotion/react';

import type { LayoutProps } from './index.types';

export const Layout = styled.main<Required<LayoutProps>>`
  @media (min-width: 640px) {
    position: absolute;
    left: 50%;
    transform: translate(-50%);

    width: 375px;
  }

  ${({ center }) =>
    center &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}

  position: relative;

  width: 100%;
  min-height: 100vh;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.colors.main_01};

  cursor: default;
`;
