import styled from '@emotion/styled';
import { css } from '@emotion/react';

import type { LayoutProps } from './index.types';

export const Layout = styled.main<Required<LayoutProps>>`
  /* 정가운데 배치하는 레이아웃 */
  ${({ center }) =>
    center &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}

  /* 배경이미지가 있는 레이아웃 */
  ${({ theme, backgroundImage }) =>
    backgroundImage
      ? css`
          background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
            url(${backgroundImage});
          background-size: cover;
        `
      : css`
          background-color: ${theme.colors.main_01};
        `}

    @media (min-width: 640px) {
    position: absolute;
    left: 50%;
    transform: translate(-50%);

    width: 375px;
  }

  position: relative;

  width: 100%;
  min-height: 100vh;
  padding: 0 20px 75px 20px;

  cursor: default;
`;

export const LayoutHeader = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.main_01};
`;
