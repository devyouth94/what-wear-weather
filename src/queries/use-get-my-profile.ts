import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type GetMyProfileResponse = {
  id: string;
  email: string;
  nickname: string;
  avatar_url: string;
};

export const useGetMyProfile = () => {
  return useQuery<GetMyProfileResponse>({
    placeholderData: keepPreviousData,
    queryKey: ['my-profile'],
    queryFn: async () => {
      const url = '/api/profile/my';
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('프로필 정보를 불러오는데 실패했습니다.');
      }

      return response.json();
    },
  });
};
