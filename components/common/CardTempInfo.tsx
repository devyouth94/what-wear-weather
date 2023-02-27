import { motion } from 'framer-motion';

type Props = {
  title: string;
  temp?: number;
  region?: string;
};

const CardTempInfo = ({ title, temp, region }: Props) => {
  return (
    <motion.div className="flex flex-col justify-center items-center w-full h-full">
      <motion.span className="text-neutral-500 text-sm font-semibold">{title}</motion.span>

      {(temp === 0 || temp) && (
        <motion.span className="text-lg font-extrabold">{temp}&#8451;</motion.span>
      )}

      {region && <motion.span className="text-lg font-extrabold">{region}</motion.span>}
    </motion.div>
  );
};

export default CardTempInfo;
