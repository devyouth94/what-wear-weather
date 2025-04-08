import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { get } from '~/src/utils/api';

export type GetMyProfileResponse = {
  id: string;
  email: string;
  nickname: string;
  avatar_url: string;
};

export const useGetMyProfile = () => {
  return useQuery({
    queryKey: ['my-profile'],
    queryFn: () => get<GetMyProfileResponse>('/api/profile/my'),
    placeholderData: keepPreviousData,
  });
};
