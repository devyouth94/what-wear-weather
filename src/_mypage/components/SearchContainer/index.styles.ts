import fontTheme from '@/styles/fontTheme';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div:nth-of-type(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;

    width: 100%;
    height: 50px;

    & > span {
      display: flex;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;

      width: 40px;
    }
  }

  button {
    width: fit-content;
    padding: 4px 8px;
    background-color: ${({ theme }) => theme.colors.secondary_01};
    border-radius: 999px;

    color: ${({ theme }) => theme.colors.main_01};
    ${fontTheme.head_04};
  }
`;
