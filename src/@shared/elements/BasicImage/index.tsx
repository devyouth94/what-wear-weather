import { IconCancel } from '@/statics/icons';

import type { BasicImageProps, ImageCancelProps } from './index.types';
import * as S from './index.styles';
import React from 'react';

const BasicImage = ({
  children,
  handleClickImage,
  src,
}: React.PropsWithChildren<BasicImageProps>) => {
  return (
    <S.Container onClick={handleClickImage}>
      {children}
      <S.ArticleImage src={src} alt="image" fill priority sizes="700px" />
    </S.Container>
  );
};

const ImageCancel = ({ handleClickCancel }: ImageCancelProps) => {
  return (
    <S.CancelButton onClick={handleClickCancel}>
      <IconCancel />
    </S.CancelButton>
  );
};

BasicImage.Cancel = ImageCancel;
export default BasicImage;
