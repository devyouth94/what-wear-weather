import LogoSmall from '~/src/components/logo-small';

const Header = () => {
  return (
    <header className="fixed left-1/2 top-0 z-10 flex h-header w-full max-w-md -translate-x-1/2 items-center justify-center">
      <LogoSmall className="relative z-10 w-20" />
      <div className="absolute inset-0 mx-3 my-2 overflow-hidden rounded-full border border-border bg-background/50 backdrop-blur" />
    </header>
  );
};

export default Header;
