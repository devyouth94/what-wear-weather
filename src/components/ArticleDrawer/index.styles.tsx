import styled from '@emotion/styled';

export const TempInfoContainer = styled.div`
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 10px;
  }
`;

export const PhotoContainer = styled.div`
  & > div {
    position: relative;

    width: 100%;
    aspect-ratio: 3 / 4;

    img {
      object-fit: cover;
      border-radius: 12px;
    }
  }
`;

export const TextContainer = styled.div`
  & > textarea {
    margin-top: 10px;
  }
`;
