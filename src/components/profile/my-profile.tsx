'use client';

import Image from 'next/image';
import { UserRoundIcon } from 'lucide-react';

import { useGetMyProfile } from '~/src/queries/use-get-my-profile';

const MyProfile = () => {
  const { data: myProfile } = useGetMyProfile();

  return (
    <section className="grid h-24 grid-cols-[56px_auto] items-center gap-3 px-3">
      {myProfile && (
        <>
          <div className="relative flex size-14 items-center justify-center overflow-hidden rounded-full border border-border">
            {myProfile.avatar_url ? (
              <Image
                src={myProfile.avatar_url}
                alt="avatar"
                sizes="56px"
                fill
                className="object-cover"
              />
            ) : (
              <UserRoundIcon strokeWidth={1.4} />
            )}
          </div>

          <p className="flex flex-col">
            <span className="font-medium">{myProfile?.nickname}</span>
            <span className="text-sm text-neutral-400">{myProfile?.email}</span>
          </p>
        </>
      )}
    </section>
  );
};

export default MyProfile;
