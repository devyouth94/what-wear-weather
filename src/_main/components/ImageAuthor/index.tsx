import Text from '@/@shared/elements/Text';
import { useBackgroundImageState } from '@/stores/useBackgroundImageStore';

import * as S from './index.styles';

const ImageAuthor = () => {
  const { profile, name, unsplash } = useBackgroundImageState();

  return (
    <S.Container>
      <Text variant="caption">
        <span>Photo by </span>
        <a href={profile} target="_blank" rel="noreferrer">
          {name}
        </a>
        <span> on </span>
        <a href={unsplash} target="_blank" rel="noreferrer">
          Unsplash
        </a>
      </Text>
    </S.Container>
  );
};

export default ImageAuthor;
