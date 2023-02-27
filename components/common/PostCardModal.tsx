import Image from 'next/image';
import { motion } from 'framer-motion';

import CardTempInfo from '@/components/common/CardTempInfo';

import useDeleteFile from '@/hooks/common/useDeleteFile';
import type { GetPostData } from '@/lib/constants/types';
import { IconDelete } from '@/static/Icons';

type Props = {
  post: GetPostData;
  handleSelected: (id: string | null) => void;
};

const PostCardModal = ({ post, handleSelected }: Props) => {
  const { mutate: deleteFile } = useDeleteFile();

  const handleDelete = (postId: string) => {
    deleteFile(postId);
  };

  return (
    <motion.div
      key={post.id}
      className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full px-5 bg-black/50 z-30"
      onClick={() => handleSelected(null)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <motion.div
        layoutId={post.id}
        className="grid grid-rows-[auto_70px] w-full h-[550px] rounded-lg bg-white">
        <motion.div className="relative">
          <motion.div className="absolute bottom-0 flex items-end p-5 w-full h-[150px] bg-gradient-to-t from-black/90 text-sm font-semibold text-white z-20">
            {post.description}
          </motion.div>

          <Image
            className="object-cover rounded-t-lg"
            src={post.image}
            alt={post.id}
            sizes="1000px"
            fill
          />
        </motion.div>

        <motion.div className="grid-cols-4 flex rounded-b-lg">
          <CardTempInfo title="기온" temp={post.temp_now} />
          <CardTempInfo title="체감" temp={post.temp_feels} />
          <CardTempInfo title="최저" temp={post.temp_min} />
          <CardTempInfo title="최고" temp={post.temp_max} />
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => handleDelete(post.id)}
        className="bg-neutral-100 p-3 rounded-full drop-shadow-lg mt-3 cursor-pointer">
        <IconDelete />
      </motion.button>
    </motion.div>
  );
};

export default PostCardModal;
