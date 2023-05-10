import styled from '@emotion/styled';

export const ProfileContainer = styled.div`
  position: relative;
  overflow: hidden;

  width: 64px;
  height: 64px;
  border: 1px solid ${({ theme }) => theme.colors.secondary_01};
  border-radius: 999px;

  img {
    object-fit: cover;
  }
`;
