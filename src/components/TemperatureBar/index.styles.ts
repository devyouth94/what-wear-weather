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
