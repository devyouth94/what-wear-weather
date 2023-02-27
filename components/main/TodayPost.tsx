import { Button } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';

import PostCard from '@/components/common/PostCard';
import PostCardModal from '@/components/common/PostCardModal';

import useGetTodayPost from '@/hooks/main/useGetTodayPost';
import useSelectedState from '@/hooks/mypage/useSelectedState';
import { useModalActions } from '@/store/useModalStore';

const TodayPost = () => {
  const { changeModalState } = useModalActions();

  const { data: todayData, status: todayStatus } = useGetTodayPost();
  const { selectedId, handleSelected } = useSelectedState();

  return (
    <div className="mt-5">
      {todayStatus === 'success' && todayData.ok && (
        <Button
          width="100%"
          size="lg"
          fontSize="15px"
          fontWeight="bold"
          bg="#b03232"
          _hover={{ bg: '#932929' }}
          className="text-white"
          onClick={() => changeModalState('write')}>
          오늘의 옷을 등록해보세요.
        </Button>
      )}

      {todayStatus === 'success' && todayData.result && (
        <>
          <PostCard isToday post={todayData.result} handleSelected={handleSelected} />

          <AnimatePresence>
            {selectedId && (
              <PostCardModal post={todayData.result} handleSelected={handleSelected} />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default TodayPost;
