import { useEffect, useState } from 'react';
import { UseFormWatch } from 'react-hook-form';
import type { SubmitData } from '@/lib/constants/types';

type Props = {
  watch: UseFormWatch<SubmitData>;
};

const PreviewImage = ({ watch }: Props) => {
  const file = watch('image');

  const [prevImg, setPrevImg] = useState('');

  useEffect(() => {
    if (!file || !file.length) return;

    setPrevImg(URL.createObjectURL(file[0]));
  }, [file]);

  return <div>{prevImg && <img src={prevImg} />}</div>;
};

export default PreviewImage;
