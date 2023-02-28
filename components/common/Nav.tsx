import { IconHome, IconUser } from '@/static/Icons';
import { useRouter } from 'next/router';

const className = `
  fixed bottom-0
  flex justify-center items-baseline
  w-full min-w-[375px] h-[75px]
  sm:w-[375px] sm:left-1/2 sm:-translate-x-1/2
  bg-transparent
  z-20
`;

const Nav = () => {
  const { push, route } = useRouter();

  return (
    <nav className={className}>
      <div className="flex justify-center items-center gap-5 px-5 py-3 bg-neutral-50 rounded-full shadow-md">
        <IconHome
          className="cursor-pointer"
          onClick={() => push('/main')}
          fill={route === '/main' ? '#b03232' : 'gray'}
        />
        <IconUser
          className="cursor-pointer"
          onClick={() => push('/mypage')}
          fill={route === '/mypage' ? '#b03232' : 'gray'}
        />
      </div>
    </nav>
  );
};

export default Nav;
