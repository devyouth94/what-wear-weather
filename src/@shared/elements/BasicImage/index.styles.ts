import Image from 'next/image';
import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;

  width: 100%;
  aspect-ratio: 3 / 4;
`;

export const ArticleImage = styled(Image)`
  border-radius: 12px;
  object-fit: cover;
`;

export const CancelButton = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 9;

  cursor: pointer;
`;
