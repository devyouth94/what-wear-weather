import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import type { SpinnerProps } from './index.types';

const SpinnerKeyframes = keyframes`
  0%, 80%, 100% { box-shadow: 0 2em 0 -1.3em }
  40% { box-shadow: 0 2em 0 0 }
`;

export const Spinner = styled.div<Required<SpinnerProps>>`
  position: absolute;
  z-index: 999;
  margin-top: ${({ size }) => `calc(-${size}px * 4)`};

  color: ${({ theme, color }) => theme.colors[color]};
  font-size: ${({ size }) => `${size}px`};
  animation-delay: -0.16s;

  &,
  &::before,
  &::after {
    border-radius: 50%;
    width: 2em;
    height: 2em;
    animation-fill-mode: both;
    animation: ${SpinnerKeyframes} 1.8s infinite ease-in-out;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
  }

  &::before {
    left: -3.5em;
    animation-delay: -0.32s;
  }

  &::after {
    left: 3.5em;
  }
`;
