import { useRouter } from 'next/router';

const Nav = () => {
  const { push } = useRouter();

  return (
    <nav className="fixed bottom-0 w-full md:w-[375px] md:translate-x-1/2 h-[60px] flex gap-3 justify-center items-center bg-neutral-300">
      <button onClick={() => push('/main')}>홈</button>
      <button onClick={() => push('/mypage')}>마이페이지</button>
    </nav>
  );
};

export default Nav;
