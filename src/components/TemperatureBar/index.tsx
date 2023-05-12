import Slider from '@/elements/Slider';

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

const TemperatureBar = ({ daily, week }: Props) => {
  return (
    <Slider
      min={week.min}
      max={week.max}
      defaultValue={[daily.min, daily.max]}
      disabled
      renderTrack={Slider.Track}
    />
  );
};

export default TemperatureBar;
