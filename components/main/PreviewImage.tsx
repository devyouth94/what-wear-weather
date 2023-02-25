import { useEffect, useState } from 'react';
import { UseFormWatch } from 'react-hook-form';

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

    return () => {
      setPrevImg('');
    };
  }, [file]);

  return <div>{prevImg && <img src={prevImg} />}</div>;
};

export default PreviewImage;
