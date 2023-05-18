import Text from '@/@shared/elements/Text';
import * as S from './index.styles';

interface Props {
  title: string;
  value: number;
}

const TempInfo = ({ title, value }: Props) => {
  return (
    <S.TempInfo>
      <Text variant="head_04">{title}</Text>
      <Text variant="head_04">{value}&#8451;</Text>
    </S.TempInfo>
  );
};

export default TempInfo;
