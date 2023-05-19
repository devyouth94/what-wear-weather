import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { postProfile } from '@/apis/api';

const usePostProfile = () => {
  const { back } = useRouter();

  return useMutation(postProfile, {
    onSettled: () => {
      back();
    },
    onSuccess: () => {
      const event = new Event('visibilitychange');
      document.dispatchEvent(event);
      toast.success('프로필 변경 성공!');
    },
    onError: () => {
      toast.error('다시 시도해주세요');
    },
  });
};

export default usePostProfile;
