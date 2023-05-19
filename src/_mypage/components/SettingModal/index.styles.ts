import styled from '@emotion/styled';

export const CloseContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  svg {
    cursor: pointer;
  }
`;

export const ContextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin-top: 30px;

  span {
    display: flex;
    align-items: center;

    height: 30px;

    cursor: pointer;
  }
`;
