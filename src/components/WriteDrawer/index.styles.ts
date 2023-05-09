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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    margin-top: 10px;

    & > label {
      cursor: pointer;
    }
  }
`;

export const TextContainer = styled.div`
  & > textarea {
    margin-top: 10px;
  }
`;
