import { css } from '@emotion/react';
import styled from '@emotion/styled';
import ReactSlider from 'react-slider';

export const RangeSlider = styled(ReactSlider)`
  width: 100%;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.main_02};
  border-radius: 999px;
`;

export const Track = styled.div<{ index: number }>`
  top: 0;
  bottom: 0;
  ${({ index, theme }) =>
    index === 1 &&
    css`
      background-color: ${theme.colors.secondary_01};
      border-radius: 999px;
    `}
`;

export const Thumb = styled.div`
  top: -4px;

  width: 14px;
  height: 14px;
  background-color: ${({ theme }) => theme.colors.main_01};
  border: 1.5px solid ${({ theme }) => theme.colors.secondary_01};
  border-radius: 999px;

  cursor: grab;
`;
