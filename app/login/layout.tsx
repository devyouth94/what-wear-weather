import { type PropsWithChildren } from 'react';

import Main from '~/src/components/layout/main';

const LoginLayout = ({ children }: PropsWithChildren) => {
  return <Main>{children}</Main>;
};

export default LoginLayout;
