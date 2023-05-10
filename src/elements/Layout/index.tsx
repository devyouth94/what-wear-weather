import React from 'react';
import * as S from './index.styles';
import type { LayoutProps } from './index.types';

const Layout = ({
  children,
  center = false,
  backgroundImage = '',
}: React.PropsWithChildren<Partial<LayoutProps>>) => {
  return (
    <S.Layout center={center} backgroundImage={backgroundImage}>
      {children}
    </S.Layout>
  );
};

const LayoutHeader = ({ children }: React.PropsWithChildren) => {
  return <S.LayoutHeader>{children}</S.LayoutHeader>;
};

Layout.Header = LayoutHeader;
export default Layout;
