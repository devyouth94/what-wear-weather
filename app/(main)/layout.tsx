import { type PropsWithChildren } from 'react';

import Header from '~/src/components/layout/header';
import Main from '~/src/components/layout/main';
import Nav from '~/src/components/layout/nav';
import { GeolocationProvider } from '~/src/contexts/geolocation-provider';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <GeolocationProvider>
        <Main className="pb-nav pt-header">{children}</Main>
        <Nav />
      </GeolocationProvider>
    </>
  );
};

export default MainLayout;
