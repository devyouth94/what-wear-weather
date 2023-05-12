import Link from 'next/link';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Nav = styled.nav<{ route: string }>`
  @media (min-width: 640px) {
    left: 50%;
    transform: translate(-50%);

    width: 375px;
  }

  position: fixed;
  bottom: 0;
  z-index: 9;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 75px;

  width: 100%;
  height: 65px;
  padding-top: 12px;
  background-color: ${({ theme }) => theme.colors.main_01};
  border-radius: 12px 12px 0 0;

  ${({ theme, route }) =>
    route !== '/main' &&
    css`
      border: 1px solid ${theme.colors.secondary_01};
      border-bottom: 0;
      padding-top: 11px;
    `}
`;

export const NavItem = styled(Link)<Required<{ route: string }>>`
  ${({ route, theme }) =>
    route === 'true'
      ? css`
          color: ${theme.colors.point_01};
        `
      : css`
          color: ${theme.colors.secondary_01};
        `}

  display: flex;
  flex-direction: column;
  gap: 8px;

  & > div {
    width: 100%;
    height: 3px;

    background-color: ${({ route, theme }) =>
      route === 'true' ? theme.colors.point_01 : 'transparent'};
  }
`;
