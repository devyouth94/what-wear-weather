import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import Modal from '@/@shared/elements/Modal';
import Text from '@/@shared/elements/Text';
import { useDrawerActions } from '@/stores/useDrawerStore';
import { useModalActions, useSettingModalState } from '@/stores/useModalStore';
import { IconClose } from '@/statics/icons';

import * as S from './index.styles';

const SettingModal = () => {
  const { replace } = useRouter();

  const isOpen = useSettingModalState();
  const { changeDrawerState } = useDrawerActions();
  const { changeModalState } = useModalActions();

  return (
    <Modal isOpen={isOpen}>
      <Modal.Contents>
        <S.CloseContainer>
          <IconClose onClick={() => changeModalState('setting')} />
        </S.CloseContainer>
        <S.ContextContainer>
          <Text variant="head_04" onClick={() => changeDrawerState('profile')}>
            프로필 설정
          </Text>
          <Text
            variant="head_04"
            onClick={() =>
              signOut().then(() => {
                replace('/');
              })
            }>
            로그아웃
          </Text>
        </S.ContextContainer>
      </Modal.Contents>

      <Modal.Overlay onClick={() => changeModalState('setting')} />
    </Modal>
  );
};

export default SettingModal;
