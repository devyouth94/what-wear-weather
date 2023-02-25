import { useRouter } from 'next/router';

const Nav = () => {
  const { push } = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 flex justify-between items-center w-full h-[60px] px-10 bg-slate-500">
      <button onClick={() => push('/main')}>홈</button>
      <button onClick={() => push('/mypage')}>마이페이지</button>
    </nav>
  );
};

export default Nav;
