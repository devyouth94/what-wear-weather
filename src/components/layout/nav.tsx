import Link from 'next/link';

const Nav = () => {
  return (
    <nav className="fixed bottom-0 left-1/2 z-10 flex h-nav w-full max-w-md -translate-x-1/2 items-start bg-orange-200 px-6 pt-2">
      <ul className="flex w-full items-center justify-between">
        {['weather', 'profile'].map((item) => (
          <li key={item} className="border-box py-1">
            <Link href={`/${item}`}>{item}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
