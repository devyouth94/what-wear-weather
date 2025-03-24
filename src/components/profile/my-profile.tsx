'use client';

import Image from 'next/image';

import { useGetMyProfile } from '~/src/queries/use-get-my-profile';

const MyProfile = () => {
  const { data: myProfile } = useGetMyProfile();

  return (
    <div className="border-box grid grid-cols-[56px_auto] items-center gap-2 p-4">
      <div className="relative size-14 overflow-hidden rounded-full">
        <Image
          src={myProfile?.avatar_url || ''}
          alt="avatar"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col">
        <span>{myProfile?.nickname}</span>
        <span>{myProfile?.email}</span>
      </div>
    </div>
  );
};

export default MyProfile;
