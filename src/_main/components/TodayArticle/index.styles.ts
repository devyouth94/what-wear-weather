import Text from '@/@shared/elements/Text';
import styled from '@emotion/styled';

export const TodayWear = styled.div`
  position: relative;
`;

export const TodayWearText = styled(Text)`
  position: absolute;
  bottom: 3px;
  left: 10px;
  z-index: 9;
`;
