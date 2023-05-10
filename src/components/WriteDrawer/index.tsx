import { useForm } from 'react-hook-form';

import Drawer from '@/components/Drawer';
import TempInfo from '@/components/TempInfo';
import BasicButton from '@/elements/BasicButton';
import Text from '@/elements/Text';
import PreviewImage from '@/components/PreviewImage';
import BasicInput from '@/elements/BasicInput';
import BasicTextarea from '@/elements/BasicTextarea';

import { useDrawerActions, useWriteDrawerState } from '@/stores/useDrawerStore';
import useGetLiveWeather from '@/hooks/main/useGetLiveWeather';
import useGetDailyWeather from '@/hooks/main/useGetDailyWeather';
import useGetCityName from '@/hooks/main/useGetCityName';
import usePostArticle from '@/hooks/main/usePostArticle';
import type { TLocation } from '@/types/locationTypes';
import type { TSubmitForm } from '@/types/articleTypes';
import { IconUpload } from '@/statics/icons';

import * as S from './index.styles';

interface Props {
  location: TLocation;
}

const WriteDrawer = ({ location }: Props) => {
  const {
    register,
    watch,
    reset,
    handleSubmit: onSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TSubmitForm>({
    defaultValues: {
      description: '',
      image: null,
    },
    reValidateMode: 'onChange',
  });

  const { mutate: postFile, status: postFileStatus } = usePostArticle(reset);
  const { data: liveWeatherData } = useGetLiveWeather(location);
  const { data: dailyWeatherData } = useGetDailyWeather(location);
  const { data: cityNameData } = useGetCityName(location);
  const imageFile = watch('image');
  const handleClickSubmitButton = (data: TSubmitForm) => {
    if (!liveWeatherData || !dailyWeatherData || !cityNameData || !data.image) return;
    postFile({
      region: cityNameData.ko || cityNameData.en,
      temp_now: liveWeatherData.temp,
      temp_feels: liveWeatherData.feels_temp,
      temp_min: dailyWeatherData.daily[0].temp_min,
      temp_max: dailyWeatherData.daily[0].temp_max,
      description: data.description,
      image: data.image[0],
    });
  };

  const isOpen = useWriteDrawerState();
  const { changeDrawerState } = useDrawerActions();
  const handleClickCloseButton = () => {
    changeDrawerState('write');
    reset();
  };

  return (
    <>
      {liveWeatherData && dailyWeatherData && (
        <Drawer isOpen={isOpen}>
          <Drawer.Header>오늘의 옷 등록</Drawer.Header>

          <Drawer.Body>
            <S.TempInfoContainer>
              <Text variant="head_03">오늘의 온도</Text>
              <div>
                <TempInfo title="현재 온도" value={liveWeatherData.temp} />
                <TempInfo title="체감 온도" value={liveWeatherData.feels_temp} />
                <TempInfo title="최저 온도" value={dailyWeatherData.daily[0].temp_min} />
                <TempInfo title="최고 온도" value={dailyWeatherData.daily[0].temp_max} />
              </div>
            </S.TempInfoContainer>

            <S.PhotoContainer>
              <Text variant="head_03">오늘의 사진</Text>
              <div>
                {imageFile ? (
                  <PreviewImage src={URL.createObjectURL(imageFile[0])} reset={reset} />
                ) : (
                  <>
                    <label htmlFor="write-image-input">
                      <IconUpload />
                    </label>
                    <BasicInput
                      hidden
                      id="write-image-input"
                      type="file"
                      accept="image/*"
                      {...register('image', { required: '이미지는 필수에요.' })}
                    />
                  </>
                )}

                {errors.image && (
                  <Text variant="caption" fontColor="point_01">
                    {errors.image.message}
                  </Text>
                )}
              </div>
            </S.PhotoContainer>

            <S.TextContainer>
              <Text variant="head_03">오늘의 기록</Text>
              <BasicTextarea
                maxLength={60}
                placeholder="선택사항입니다. (60자이내)"
                {...register('description', {
                  maxLength: { value: 60, message: '60자 이내로 작성해주세요.' },
                })}
              />
            </S.TextContainer>
          </Drawer.Body>

          <Drawer.Bottom>
            <BasicButton
              disabled={isSubmitting || postFileStatus === 'loading'}
              type="submit"
              onClick={onSubmit(handleClickSubmitButton)}>
              등록
            </BasicButton>
            <BasicButton
              onClick={handleClickCloseButton}
              variant="outline"
              color="secondary_01"
              fontColor="secondary_01">
              닫기
            </BasicButton>
          </Drawer.Bottom>
        </Drawer>
      )}
    </>
  );
};

export default WriteDrawer;
