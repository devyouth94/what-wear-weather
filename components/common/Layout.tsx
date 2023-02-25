import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Layout = ({ children, className }: Props) => {
  const { route } = useRouter();

  return (
    <AnimatePresence mode="wait">
      <main className="w-full md:w-[375px] md:translate-x-1/2 px-5 bg-neutral-100">
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
