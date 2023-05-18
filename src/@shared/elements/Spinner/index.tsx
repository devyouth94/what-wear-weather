import * as S from './index.styles';

import type { SpinnerProps } from './index.types';

const Spinner = ({ color = 'secondary_01', size = 8 }: Partial<SpinnerProps>) => {
  return <S.Spinner color={color} size={size} />;
};

export default Spinner;
