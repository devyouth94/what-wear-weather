import fontTheme from '@/styles/fontTheme';
import styled from '@emotion/styled';

export const Modal = styled.div`
  @media (min-width: 640px) {
    left: 50%;
    transform: translate(-50%);

    width: 375px;
  }

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;

  width: 100%;
  height: 100vh;
`;

export const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;

  background-color: black;
  opacity: 0.5;
`;

export const ModalContents = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9;

  width: 170px;
  height: calc(100vh - 62px);
  padding: 26px 20px 20px 20px;
  background-color: ${({ theme }) => theme.colors.main_01};
  border-radius: 12px 0 0 12px;

  ${fontTheme.head_04};
  color: ${({ theme }) => theme.colors.secondary_01};
`;
