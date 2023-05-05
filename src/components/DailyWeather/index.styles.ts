import styled from '@emotion/styled';

export const Container = styled.ul`
  width: 100%;
  padding: 0 12px;
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.main_01};
  border-radius: 12px;

  & > li {
    border-bottom: 1px solid ${({ theme }) => theme.colors.secondary_01};
  }

  & > li:last-of-type {
    border-bottom: none;
  }
`;

export const Item = styled.li`
  display: grid;
  grid-template-columns: 68px 25px auto;
  align-items: center;

  width: 100%;
  height: 50px;
`;

export const WeatherIcon = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export const Temperature = styled.div`
  display: grid;
  grid-template-columns: 40px 75px 40px;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
