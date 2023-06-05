import { useForm } from 'react-hook-form';

import useGetCityName from '@/_main/queries/useGetCityName';
import useGetDailyWeather from '@/_main/queries/useGetDailyWeather';
import useGetLiveWeather from '@/_main/queries/useGetLiveWeather';
import usePostArticle from '@/_main/queries/usePostArticle';

import BasicButton from '@/@shared/elements/BasicButton';
import BasicInput from '@/@shared/elements/BasicInput';
import BasicImage from '@/@shared/elements/BasicImage';
import BasicTextarea from '@/@shared/elements/BasicTextarea';
import Drawer from '@/@shared/elements/Drawer';
import TempInfo from '@/@shared/elements/TempInfo';
import Text from '@/@shared/elements/Text';
import useModalHistoryBack from '@/@shared/hooks/useModalHistoryBack';

import { IconUpload } from '@/statics/icons';
import type { TLocation } from '@/types/locationTypes';
import type { TSubmitForm } from '@/types/articleTypes';

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

  const { query, handleClickCloseButton } = useModalHistoryBack('write', () => {
    reset();
  });
  const isOpen = query === 'on';

  const imageFile = watch('image');
  const { data: cityNameData } = useGetCityName(location);
  const { data: liveWeatherData } = useGetLiveWeather(location);
  const { data: dailyWeatherData } = useGetDailyWeather(location);

  const { mutate: postFile, status: postFileStatus } = usePostArticle(reset);
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

  const handleClickCancel = () => {
    reset((value) => ({ ...value, image: null }));
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
                  <BasicImage src={URL.createObjectURL(imageFile[0])}>
                    <BasicImage.Cancel handleClickCancel={handleClickCancel} />
                  </BasicImage>
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
              loading={isSubmitting || postFileStatus === 'loading'}
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
