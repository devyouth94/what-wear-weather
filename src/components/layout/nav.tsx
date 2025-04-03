'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CircleUserRoundIcon, SunIcon } from 'lucide-react';

import { cn } from '~/src/utils/class-name';

const navItems = [
  {
    icon: <SunIcon absoluteStrokeWidth strokeWidth={1.4} />,
    href: 'weather',
  },
  {
    icon: <CircleUserRoundIcon absoluteStrokeWidth strokeWidth={1.3} />,
    href: 'profile',
  },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-3 left-1/2 z-10 flex h-nav -translate-x-1/2 items-center justify-center rounded-full bg-primary px-2 text-primary-foreground drop-shadow-md">
      <ul className="flex w-full items-center justify-center gap-3">
        {navItems.map(({ href, icon }) => (
          <li
            key={href}
            className={cn(
              'rounded-full bg-transparent p-2 transition-colors duration-300',
              pathname === `/${href}` && 'bg-primary-foreground text-primary',
            )}
          >
            <Link href={`/${href}`}>{icon}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
