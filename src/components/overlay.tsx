import React, { type PropsWithChildren } from 'react';
import { LoaderIcon } from 'lucide-react';

import { cn } from '~/src/utils/class-name';

type Props = {
  visible: boolean;
  loader?: boolean;
};

const Overlay = ({
  visible,
  loader = false,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={cn(
        'absolute inset-0 z-50 flex items-center justify-center bg-black/30 text-white backdrop-blur-sm',
        'transition-opacity duration-150',
        visible ? 'opacity-100' : 'opacity-0',
      )}
    >
      {!children && loader && <LoaderIcon className="animate-spin-slow" />}
      {children}
    </div>
  );
};

export default Overlay;
