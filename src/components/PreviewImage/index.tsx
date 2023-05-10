import Image from 'next/image';
import type { UseFormReset } from 'react-hook-form';

import type { TSubmitForm } from '@/types/articleTypes';

import * as S from './index.styles';
import { IconCancel } from '@/statics/icons';

interface Props {
  src: string;
  reset: UseFormReset<TSubmitForm>;
}

const PreviewImage = ({ src, reset }: Props) => {
  const handleClickCancel = () => {
    reset((value) => ({ ...value, image: null }));
  };

  return (
    <>
      {src && (
        <S.PreviewImage>
          <S.CancelButton onClick={handleClickCancel}>
            <IconCancel />
          </S.CancelButton>
          <Image src={src} alt="today" fill />
        </S.PreviewImage>
      )}
    </>
  );
};

export default PreviewImage;
