import { type PropsWithChildren } from 'react';

import Main from '~/src/components/layout/main';

const LoginLayout = ({ children }: PropsWithChildren) => {
  return (
    <Main className="flex h-dvh flex-col items-center justify-center gap-10 px-5">
      {children}
    </Main>
  );
};

export default LoginLayout;
