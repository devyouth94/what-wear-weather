import styled from '@emotion/styled';

export const Drawer = styled.div`
  @media (min-width: 640px) {
    left: 50%;
    transform: translate(-50%);

    width: 375px;
  }

  position: fixed;
  top: 0;
  z-index: 99;

  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.main_01};
`;

export const DrawerHeader = styled.header`
  position: fixed;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.main_01};
`;

export const DrawerBody = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;

  height: calc(100vh - 170px);
  margin-top: 82px;
  padding: 0 20px;

  overflow-y: overlay;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #708488;
    border-radius: 0.25rem;
  }

  color: ${({ theme }) => theme.colors.secondary_01};
`;

export const DrawerBottom = styled.nav`
  position: fixed;
  bottom: 0;

  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.main_01};
`;
