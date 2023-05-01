import * as S from './index.styles';
import type { LayoutProps } from './index.types';

const Layout = ({ children, center = false }: React.PropsWithChildren<Partial<LayoutProps>>) => {
  return <S.Layout center={center}>{children}</S.Layout>;
};

export default Layout;
