import { useState } from 'react';

import Slider from '@/@shared/elements/Slider';
import Text from '@/@shared/elements/Text';

import * as S from './index.styles';

interface Props {
  handleClickSearch: (temp: number[]) => void;
}

const SearchContainer = ({ handleClickSearch }: Props) => {
  const [tempInput, setTempInput] = useState([-20, 40]);
  const handleChangeTempInput = (value: any) => {
    setTempInput(value);
  };

  return (
    <S.Container>
      <div>
        <Text variant="head_03">{tempInput[0]}&#8451;</Text>
        <Slider
          min={-20}
          max={40}
          defaultValue={tempInput}
          onChange={handleChangeTempInput}
          renderThumb={Slider.Thumb}
          renderTrack={Slider.Track}
        />
        <Text variant="head_03">{tempInput[1]}&#8451;</Text>
      </div>

      <button onClick={() => handleClickSearch(tempInput)}>검색</button>
    </S.Container>
  );
};

export default SearchContainer;
