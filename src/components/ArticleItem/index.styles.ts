import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;

  width: 100%;
  aspect-ratio: 3 / 4;

  img {
    object-fit: cover;
    border-radius: 12px;
  }
`;

export const ArticleInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;

  width: 100%;
  height: 170px;
  padding: 10px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.5) 90%);
  border-radius: 0 0 12px 12px;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;
