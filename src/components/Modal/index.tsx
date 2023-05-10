import React, { HTMLAttributes } from 'react';
import * as S from './index.styles';

interface Props {
  isOpen: boolean;
}

const Modal = ({ children, isOpen }: React.PropsWithChildren<Props>) => {
  return <>{isOpen && <S.Modal>{children}</S.Modal>}</>;
};

const ModalContents = ({ children }: React.PropsWithChildren) => {
  return <S.ModalContents>{children}</S.ModalContents>;
};

const ModalOverlay = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <S.ModalOverlay {...props} />;
};

Modal.Contents = ModalContents;
Modal.Overlay = ModalOverlay;
export default Modal;
