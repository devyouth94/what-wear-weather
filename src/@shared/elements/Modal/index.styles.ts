import styled from '@emotion/styled';

import fontTheme from '@/styles/fontTheme';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';

export const Modal = styled(motion(Dialog))`
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
  height: 100dvh;
`;

export const ModalContents = styled(motion(Dialog.Panel))`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;

  width: 170px;
  height: calc(100dvh - 62px);
  padding: 26px 20px 20px 20px;
  background-color: ${({ theme }) => theme.colors.main_01};
  border-radius: 12px 0 0 12px;

  ${fontTheme.head_04};
  color: ${({ theme }) => theme.colors.secondary_01};
`;
