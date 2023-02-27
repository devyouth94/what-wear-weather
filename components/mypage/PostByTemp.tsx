import { useForm } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';

import SearchForm from '@/components/mypage/SearchForm';
import ContainerText from '@/components/common/ContainerText';
import PostContainer from '@/components/mypage/PostContainer';
import PostCard from '@/components/common/PostCard';
import PostCardModal from '@/components/common/PostCardModal';

import useGetPostsBySearch from '@/hooks/mypage/useGetPostsBySearch';
import useSelectedState from '@/hooks/mypage/useSelectedState';

const PostByTemp = () => {
  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit: onSubmit,
  } = useForm({ defaultValues: { min: -20, max: 40 }, mode: 'onSubmit' });

  const { data: searchData, status: searchStatus } = useGetPostsBySearch(watch());
  const { selectedId, handleSelected } = useSelectedState();

  return (
    <>
      <SearchForm
        register={register}
        watch={watch}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
      />

      {searchStatus === 'success' && !!(searchData.length === 0) && (
        <ContainerText>조건에 맞는 옷이 없어요.</ContainerText>
      )}

      <PostContainer>
        {searchStatus === 'success' &&
          searchData.map((post) => (
            <PostCard key={post.id} post={post} handleSelected={handleSelected} />
          ))}
      </PostContainer>

      <AnimatePresence>
        {searchStatus === 'success' &&
          searchData
            .filter((post) => post.id === selectedId)
            .map((post) => (
              <PostCardModal key={post.id} post={post} handleSelected={handleSelected} />
            ))}
      </AnimatePresence>
    </>
  );
};

export default PostByTemp;
