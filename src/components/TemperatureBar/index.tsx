import * as S from './index.styles';

interface Props {
  daily: {
    min: number;
    max: number;
  };
  week: {
    min: number;
    max: number;
  };
}

const Track = (props: any, state: any) => {
  return <S.Track {...props} index={state.index} />;
};

const TemperatureBar = ({ daily, week }: Props) => {
  return (
    <S.RangeSlider
      min={week.min}
      max={week.max}
      defaultValue={[daily.min, daily.max]}
      disabled
      renderTrack={Track}
    />
  );
};

export default TemperatureBar;
