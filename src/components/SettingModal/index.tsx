import Modal from '@/components/Modal';
import Text from '@/elements/Text';

import { useDrawerActions } from '@/stores/useDrawerStore';
import { useModalActions, useSettingModalState } from '@/stores/useModalStore';
import { IconClose } from '@/statics/icons';

import * as S from './index.styles';

const SettingModal = () => {
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
        </S.ContextContainer>
      </Modal.Contents>
      <Modal.Overlay onClick={() => changeModalState('setting')} />
    </Modal>
  );
};

export default SettingModal;
