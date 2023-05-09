import Text from '@/elements/Text';
import * as S from './index.styles';

interface Props {
  isOpen: boolean;
}

const Drawer = ({ children, isOpen }: React.PropsWithChildren<Props>) => {
  return <>{isOpen && <S.Drawer>{children}</S.Drawer>}</>;
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
