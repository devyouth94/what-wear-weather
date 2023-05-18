import React from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';

import type { LayoutProps } from './index.types';
import * as S from './index.styles';

const Layout = ({
  children,
  center = false,
  backgroundImage = '',
}: React.PropsWithChildren<Partial<LayoutProps>>) => {
  const { route } = useRouter();

  return (
    <AnimatePresence mode="wait">
      <S.Layout backgroundImage={backgroundImage}>
        <S.MotionLayout
          key={route}
          center={center ? 'true' : 'false'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          {children}
        </S.MotionLayout>
      </S.Layout>
    </AnimatePresence>
  );
};

const LayoutHeader = ({ children }: React.PropsWithChildren) => {
  return <S.LayoutHeader>{children}</S.LayoutHeader>;
};

Layout.Header = LayoutHeader;
export default Layout;
