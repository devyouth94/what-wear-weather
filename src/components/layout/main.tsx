import { type ComponentPropsWithoutRef, type PropsWithChildren } from 'react';

import { cn } from '~/src/utils/class-name';

const Main = ({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentPropsWithoutRef<'main'>>) => {
  return (
    <main
      className={cn(
        'absolute left-1/2 top-0 min-h-dvh w-full max-w-md -translate-x-1/2 bg-green-200',
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
};

export default Main;
