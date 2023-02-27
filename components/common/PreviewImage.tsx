import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { UseFormWatch } from 'react-hook-form';

type Props = {
  watch: UseFormWatch<any>;
  initialImg?: string;
};

const PreviewImage = ({ watch, initialImg }: Props) => {
  const file = watch('image');

  const [prevImg, setPrevImg] = useState(initialImg || '');

  useEffect(() => {
    if (!file || !file.length) return;

    setPrevImg(URL.createObjectURL(file[0]));
  }, [file]);

  return (
    <>
      {prevImg && (
        <div className="relative w-full min-h-[400px]">
          <Image className="rounded-md object-cover" src={prevImg} alt={prevImg} fill />
        </div>
      )}
    </>
  );
};

export default PreviewImage;
