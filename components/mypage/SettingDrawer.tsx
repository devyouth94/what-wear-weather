import { useModalActions, useSettingDrawerState } from '@/store/useModalStore';
import tailwindThemeToggle from '@/styles/tailwindThemeToggle';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Switch,
  useColorMode,
} from '@chakra-ui/react';
import { signOut } from 'next-auth/react';

const SettingDrawer = () => {
  const settingDrawer = useSettingDrawerState();
  const { changeModalState } = useModalActions();

  const { colorMode, toggleColorMode } = useColorMode();

  const handleClose = () => {
    changeModalState('setting');
  };

  const handleSignOut = () => {
    signOut().then(() => {
      window.location.replace('/');
    });
  };

  const handleToggleColor = () => {
    toggleColorMode();
    tailwindThemeToggle();
  };

  return (
    <>
      <Drawer isOpen={settingDrawer} placement="right" onClose={handleClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody marginTop={10}>
            <div>
              <span>다크모드</span>
              <Switch onChange={handleToggleColor} isChecked={colorMode === 'dark'} />
            </div>
            <div>
              <button onClick={handleSignOut}>로그아웃</button>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SettingDrawer;
