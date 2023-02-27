import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { Button, FormControl, Input } from '@chakra-ui/react';

import useGetPostsBySearch from '@/hooks/mypage/useGetPostsBySearch';

type FormData = {
  min: number;
  max: number;
};

type Props = {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  errors: FieldErrors<FormData>;
  isSubmitting: boolean;
  onSubmit: UseFormHandleSubmit<FormData>;
};

const SearchForm = ({ register, watch, errors, isSubmitting, onSubmit }: Props) => {
  const { refetch } = useGetPostsBySearch(watch());

  const handleSubmit = () => {
    refetch();
  };

  return (
    <form
      className="grid grid-cols-[auto_25px_auto_25px_50px] gap-1 items-center mt-5"
      onSubmit={onSubmit(handleSubmit)}>
      <FormControl isInvalid={!!errors.min}>
        <Input
          id="min"
          type="number"
          fontWeight="black"
          placeholder="-20도 이상"
          {...register('min', {
            required: '최저온도는 필수 입력입니다.',
            min: { value: -20, message: '-20도 이상만 가능합니다.' },
          })}
        />
      </FormControl>

      <span className="font-black text-center text-lg">~</span>

      <FormControl isInvalid={!!errors.max}>
        <Input
          id="max"
          type="number"
          fontWeight="black"
          placeholder="40도 이하"
          {...register('max', {
            required: '최고온도는 필수 입력입니다.',
            max: { value: 40, message: '40도 이하만 가능합니다.' },
          })}
        />
      </FormControl>

      <span className="font-black text-center text-lg">&#8451;</span>

      <Button
        type="submit"
        fontSize="14px"
        bg="#b03232"
        _hover={{ bg: '#932929' }}
        isDisabled={!!errors.min || !!errors.max}
        isLoading={isSubmitting}
        className="text-white">
        검색
      </Button>
    </form>
  );
};

export default SearchForm;
