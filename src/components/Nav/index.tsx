import { useRouter } from 'next/router';

import { IconExplore, IconMain, IconMypage } from '@/statics/icons';
import * as S from './index.styles';

const NAV_ARR = [
  {
    icon: <IconMain />,
    path: '/main',
  },
  {
    icon: <IconExplore />,
    path: '/explore',
  },
  {
    icon: <IconMypage />,
    path: '/mypage',
  },
];

const Nav = () => {
  const { route } = useRouter();

  return (
    <S.Nav>
      {NAV_ARR.map((item, idx) => (
        <S.NavItem key={idx} href={item.path} route={String(route === item.path)}>
          {item.icon}
          <div />
        </S.NavItem>
      ))}
    </S.Nav>
  );
};

export default Nav;
