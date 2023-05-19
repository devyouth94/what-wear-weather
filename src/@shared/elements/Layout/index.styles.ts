import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import type { LayoutStyleProps } from './index.types';

export const LayoutHeader = styled.header`
  @media (min-width: 640px) {
    top: 0;
    left: 50%;
    transform: translate(-50%);

    width: 375px;
  }

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.main_01};

  svg {
    cursor: pointer;
  }
`;

export const Layout = styled.main<Partial<LayoutStyleProps>>`
  @media (min-width: 640px) {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);

    width: 375px;
  }

  /* 배경이미지가 있는 레이아웃 */
  ${({ theme, backgroundImage }) =>
    backgroundImage
      ? css`
          background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
            url(${backgroundImage});
          background-size: cover;
        `
      : css`
          background-color: ${theme.colors.main_01};
        `}

  position: relative;

  min-width: 375px;
  width: 100%;

  cursor: default;
`;

export const MotionLayout = styled(motion.div)<Partial<LayoutStyleProps>>`
  /* 정가운데 배치하는 레이아웃 */
  ${({ center }) =>
    center === 'true'
      ? css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          height: 100dvh;
          padding: 0 20px;
        `
      : css`
          min-height: 100dvh;
          padding: 0 20px 65px 20px;
        `}
`;
