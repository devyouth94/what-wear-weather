import React, { HTMLAttributes } from 'react';
import { AnimatePresence } from 'framer-motion';

import Overlay from '@/@shared/elements/Overlay';

import * as S from './index.styles';

interface Props {
  isOpen: boolean;
}

const Modal = ({ children, isOpen }: React.PropsWithChildren<Props>) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <S.Modal initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {children}
        </S.Modal>
      )}
    </AnimatePresence>
  );
};

const ModalContents = ({ children }: React.PropsWithChildren) => {
  return (
    <S.ModalContents
      initial={{ x: '50px', opacity: 1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ easeInOut: [0.47, 0.14, 0.55, 0.89] }}
      exit={{ x: '50px', opacity: 1 }}>
      {children}
    </S.ModalContents>
  );
};

const ModalOverlay = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <Overlay {...props} />;
};

Modal.Contents = ModalContents;
Modal.Overlay = ModalOverlay;
export default Modal;
