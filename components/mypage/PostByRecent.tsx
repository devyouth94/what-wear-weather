import { AnimatePresence } from 'framer-motion';
import { Skeleton } from '@chakra-ui/react';

import ContainerText from '@/components/common/ContainerText';
import PostContainer from '@/components/mypage/PostContainer';
import PostCard from '@/components/common/PostCard';
import PostCardModal from '@/components/common/PostCardModal';

import useGetPosts from '@/hooks/mypage/useGetPosts';
import useSelectedState from '@/hooks/mypage/useSelectedState';

const PostByRecent = () => {
  const { data: postData, status: postStatus } = useGetPosts();
  const { selectedId, handleSelected } = useSelectedState();

  return (
    <>
      {postStatus === 'success' && !!(postData.length === 0) && (
        <ContainerText>아직 옷장에 옷이 없어요.</ContainerText>
      )}

      <PostContainer>
        {postStatus === 'success'
          ? postData.map((post) => (
              <PostCard key={post.id} post={post} handleSelected={handleSelected} />
            ))
          : [1, 2, 3, 4].map((item) => <Skeleton key={item} height="300px" rounded="lg" />)}
      </PostContainer>

      <AnimatePresence>
        {postStatus === 'success' &&
          postData
            .filter((post) => post.id === selectedId)
            .map((post) => (
              <PostCardModal key={post.id} post={post} handleSelected={handleSelected} />
            ))}
      </AnimatePresence>
    </>
  );
};

export default PostByRecent;
