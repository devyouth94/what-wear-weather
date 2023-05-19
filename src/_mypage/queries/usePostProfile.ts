import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { postProfile } from '@/apis/api';
import { useDrawerActions } from '@/stores/useDrawerStore';
import { toast } from 'react-toastify';
import { useModalActions } from '@/stores/useModalStore';

const usePostProfile = () => {
  const { changeDrawerState } = useDrawerActions();
  const { changeModalState } = useModalActions();
  const { replace } = useRouter();

  return useMutation(postProfile, {
    onSettled: () => {
      changeDrawerState('profile');
      changeModalState('setting');
      replace('/mypage');
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
