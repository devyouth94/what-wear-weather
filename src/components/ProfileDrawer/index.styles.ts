import styled from '@emotion/styled';

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ProfileContainer = styled.div`
  & > div {
    display: flex;
    align-items: center;
    gap: 15px;

    margin-top: 10px;
  }
`;
