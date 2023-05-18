import fontTheme from '@/styles/fontTheme';
import styled from '@emotion/styled';

export const LiveWeather = styled.section`
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  width: calc(100% + 40px);
  height: 190px;
  margin-left: -20px;
  padding-left: 20px;
`;

export const WeatherBadge = styled.div`
  width: fit-content;
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.colors.secondary_01};
  border-radius: 999px;

  color: ${({ theme }) => theme.colors.main_01};
  ${fontTheme.head_04};
`;

export const WeatherIcon = styled.div`
  position: absolute;
  right: -50px;

  width: 170px;
  height: 170px;
`;

export const FlexMiddle = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const FlexBottom = styled.div`
  display: flex;
  flex-direction: column;
`;
