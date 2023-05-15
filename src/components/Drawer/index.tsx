import Text from '@/elements/Text';
import * as S from './index.styles';
import { AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
}

const Drawer = ({ children, isOpen }: React.PropsWithChildren<Props>) => {
  return (
    <>
      {isOpen && (
        <AnimatePresence>
          <S.Drawer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {children}
          </S.Drawer>
        </AnimatePresence>
      )}
    </>
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
