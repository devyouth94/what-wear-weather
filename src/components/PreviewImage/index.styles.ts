import styled from '@emotion/styled';

export const PreviewImage = styled.div`
  position: relative;

  width: 100%;
  aspect-ratio: 3 / 4;

  img {
    border-radius: 12px;
    object-fit: cover;
  }
`;

export const CancelButton = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 9;

  cursor: pointer;
`;
