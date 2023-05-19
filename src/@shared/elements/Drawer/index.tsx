import { AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

import Text from '@/@shared/elements/Text';

import * as S from './index.styles';

interface Props {
  isOpen: boolean;
}

const Drawer = ({ children, isOpen }: React.PropsWithChildren<Props>) => {
  const isSmall = useMediaQuery({ query: '(min-width: 640px)' });

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <S.Drawer
          initial={{ x: isSmall ? '-50%' : 0, y: '100dvh' }}
          animate={{ x: isSmall ? '-50%' : 0, y: 0 }}
          transition={{ easeInOut: [0.47, 0.14, 0.55, 0.89] }}
          exit={{ x: isSmall ? '-50%' : 0, y: '100dvh' }}>
          {children}
        </S.Drawer>
      )}
    </AnimatePresence>
  );
};

const DrawerHeader = ({ children }: React.PropsWithChildren) => {
  return (
    <S.DrawerHeader>
      <Text variant="head_01">{children}</Text>
    </S.DrawerHeader>
  );
};

const DrawerBody = ({ children }: React.PropsWithChildren) => {
  return <S.DrawerBody>{children}</S.DrawerBody>;
};

const DrawerBottom = ({ children }: React.PropsWithChildren) => {
  return <S.DrawerBottom>{children}</S.DrawerBottom>;
};

Drawer.Header = DrawerHeader;
Drawer.Body = DrawerBody;
Drawer.Bottom = DrawerBottom;
export default Drawer;
