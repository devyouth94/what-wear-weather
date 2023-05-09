import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { UseFormReset } from 'react-hook-form';

import type { TSubmitForm } from '@/types/articleTypes';

import * as S from './index.styles';
import { IconCancel } from '@/statics/icons';

interface Props {
  image: File;
  reset: UseFormReset<TSubmitForm>;
}

const PreviewImage = ({ image, reset }: Props) => {
  const [prevImg, setPrevImg] = useState('');

  const handleClickCancel = () => {
    reset((value) => ({ ...value, image: null }));
  };

  useEffect(() => {
    if (!image) return;

    setPrevImg(URL.createObjectURL(image));
  }, [image]);

  return (
    <>
      {prevImg && (
        <S.PreviewImage>
          <S.CancelButton onClick={handleClickCancel}>
            <IconCancel />
          </S.CancelButton>
          <Image src={prevImg} alt={prevImg} fill />
        </S.PreviewImage>
      )}
    </>
  );
};

export default PreviewImage;
