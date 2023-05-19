import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import Modal from '@/@shared/elements/Modal';
import Text from '@/@shared/elements/Text';
import useModalHistoryBack from '@/@shared/hooks/useModalHistoryBack';
import useModalHistoryPush from '@/@shared/hooks/useModalHistoryPush';
import { useDrawerActions } from '@/stores/useDrawerStore';
import { useModalActions, useSettingModalState } from '@/stores/useModalStore';
import { IconClose } from '@/statics/icons';

import * as S from './index.styles';

const SettingModal = () => {
  const { replace } = useRouter();

  const isOpen = useSettingModalState();
  const { changeModalState } = useModalActions();
  const { handleClickCloseButton } = useModalHistoryBack('setting', () =>
    changeModalState('setting'),
  );

  const { changeDrawerState } = useDrawerActions();
  const { historyPush } = useModalHistoryPush('profile', 'on');
  const handleClickProfile = () => {
    changeDrawerState('profile');
    historyPush();
  };

  return (
    <Modal isOpen={isOpen}>
      <Modal.Contents>
        <S.CloseContainer>
          <IconClose onClick={handleClickCloseButton} />
        </S.CloseContainer>
        <S.ContextContainer>
          <Text variant="head_04" onClick={handleClickProfile}>
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

      <Modal.Overlay onClick={handleClickCloseButton} />
    </Modal>
  );
};

export default SettingModal;
