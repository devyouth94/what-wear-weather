import { Avatar, Heading } from '@chakra-ui/react';

import { IconRepeat } from '@/static/Icons';
import { useModalActions } from '@/store/useModalStore';

type Props = {
  nickname: string;
  image: string;
};

const UserInfo = ({ nickname, image }: Props) => {
  const { changeModalState } = useModalActions();

  return (
    <div className="relative flex flex-col justify-center items-center pt-5">
      <div className="relative">
        <IconRepeat
          onClick={() => changeModalState('profileImg')}
          className="absolute right-1 top-1 block w-5 p-1 rounded-full bg-[#b03232] z-10 cursor-pointer"
        />
        <Avatar size="xl" src={image || ''} />
      </div>

      <div className="flex flex-col items-center mt-3">
        <Heading size="md">{nickname}</Heading>
        <span
          onClick={() => changeModalState('nickname')}
          className="mt-1 text-sm text-neutral-400 cursor-pointer hover:underline">
          닉네임 변경
        </span>
      </div>
    </div>
  );
};

export default UserInfo;
