import type { ReactSliderProps } from 'react-slider';

import * as S from './index.styles';

const Track = (props: any, state: any) => {
  return <S.Track {...props} index={state.index} />;
};

const Thumb = (props: any) => {
  return <S.Thumb {...props} />;
};

const Slider = ({ ...props }: ReactSliderProps<number | readonly number[]>) => {
  return <S.RangeSlider {...props} />;
};

Slider.Track = Track;
Slider.Thumb = Thumb;
export default Slider;
