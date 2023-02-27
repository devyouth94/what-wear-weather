import { CSSProperties } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
};

const Layout = ({ children, className, style }: Props) => {
  const { route } = useRouter();

  return (
    <AnimatePresence mode="wait">
      <main
        style={style}
        className="w-full min-w-[375px] md:absolute md:w-[375px] md:left-1/2 md:-translate-x-1/2 px-5 bg-neutral-100 cursor-default">
        <motion.div
          key={route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`min-h-screen ${className}`}>
          {children}
        </motion.div>
      </main>
    </AnimatePresence>
  );
};

export default Layout;
