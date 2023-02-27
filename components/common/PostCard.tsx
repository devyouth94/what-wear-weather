import Image from 'next/image';
import { motion } from 'framer-motion';

import type { GetPostData } from '@/lib/constants/types';
import { longNowTime } from '@/lib/utils/timeCalculate';

type Props = {
  post: GetPostData;
  handleSelected: (id: string | null) => void;
  isToday?: boolean;
};

const PostCard = ({ post, handleSelected, isToday }: Props) => {
  return (
    <motion.div
      key={post.id}
      className="relative w-full h-[300px] rounded-md bg-transparent"
      layoutId={post.id}
      onClick={() => handleSelected(post.id)}>
      {isToday && (
        <motion.span className="absolute top-3 left-4 z-10 drop-shadow-md text-2xl font-black text-white">
          {`Today's Wear`}
        </motion.span>
      )}

      <motion.span className="absolute bottom-12 right-4 z-20 text-white text-2xl font-extrabold">
        {post.temp_now}&#8451;
      </motion.span>

      <motion.span className="absolute bottom-4 right-4 w-[100px] text-right text-white text-xs font-bold z-20">
        {longNowTime(post.createdAt)}
      </motion.span>

      <motion.div className="absolute bottom-0 w-full h-[130px] bg-gradient-to-t from-black/70 z-10 rounded-b-md" />

      <Image
        className="object-cover rounded-md"
        src={post.image}
        alt={post.id}
        sizes="1000px"
        fill
        priority
      />
    </motion.div>
  );
};

export default PostCard;
