import { type PropsWithChildren } from 'react';

import Header from '~/src/components/layout/header';
import Main from '~/src/components/layout/main';
import Nav from '~/src/components/layout/nav';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <Main className="pt-header pb-nav">{children}</Main>
      <Nav />
    </>
  );
};

export default MainLayout;
