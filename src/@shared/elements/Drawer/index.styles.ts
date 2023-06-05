import styled from '@emotion/styled';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';

export const Drawer = styled(motion(Dialog.Panel))`
  @media (min-width: 640px) {
    left: 50%;
    transform: translateX(-50%);

    width: 375px;
  }

  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 99;
  overscroll-behavior-y: contain;

  width: 100%;
  min-width: 375px;
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.main_01};
`;

export const DrawerHeader = styled(Dialog.Title)`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  min-width: 375px;
  height: 82px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.colors.main_01};
`;

export const DrawerBody = styled(Dialog.Description)`
  display: flex;
  flex-direction: column;
  gap: 20px;

  height: calc(100dvh - 170px);
  margin-top: 82px;
  padding: 0 20px;

  color: ${({ theme }) => theme.colors.secondary_01};

  overscroll-behavior-y: contain;
  overflow-y: overlay;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #708488;
    border-radius: 99px;
  }
`;

export const DrawerBottom = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;
  min-width: 375px;
  height: 88px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.colors.main_01};
`;
