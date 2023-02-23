import { useSession } from 'next-auth/react';

import useGeolocation from '@/hooks/common/useGeolocation';
import useGetCityName from '@/hooks/main/useGetCityName';
import useGetLiveWeather from '@/hooks/main/useGetLiveWeather';
import useGetDailyWeather from '@/hooks/main/useGetDailyWeather';
import { useRouter } from 'next/router';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import PreviewImage from '@/components/main/PreviewImage';
import type { SubmitData } from '@/lib/constants/types';
import usePostFile from '@/hooks/main/usePostFile';

const Main = () => {
  const { push } = useRouter();
  const { location, handleNewLocation } = useGeolocation();

  const { data: userData } = useSession();
  const { data: cityNameData, status: cityNameStatus } = useGetCityName(location);
  const { data: liveWeatherData, status: liveWeatherStatus } = useGetLiveWeather(location);
  const { data: dailyWeatherData, status: dailyWeatherStatus } = useGetDailyWeather(location);

  const { mutate: postFile } = usePostFile();

  const { isOpen, onToggle } = useDisclosure();
  const {
    register,
    watch,
    handleSubmit: onSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SubmitData>({
    defaultValues: {
      description: '',
    },
  });

  const handleSubmit = (data: SubmitData) => {
    postFile(
      {
        region: cityNameData?.ko || cityNameData?.en || '',
        temp_now: liveWeatherData?.temp || 0,
        temp_feels: liveWeatherData?.feels_temp || 0,
        temp_min: (dailyWeatherData && dailyWeatherData[0].temp_min) || 0,
        temp_max: (dailyWeatherData && dailyWeatherData[0].temp_max) || 0,
        description: data.description,
        image: data.image[0],
      },
      {
        onSuccess: () => {
          onToggle();
        },
      },
    );
  };

  return (
    <>
      <Drawer size="full" placement="bottom" isOpen={isOpen} onClose={onToggle}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">오늘의 옷 등록하기</DrawerHeader>
          <DrawerBody>
            <p>{cityNameData?.ko || cityNameData?.en}</p>
            <p>
              {liveWeatherData?.temp} / {liveWeatherData?.feels_temp} &#8451;
            </p>
            <p>
              {dailyWeatherData &&
                `${dailyWeatherData[0].temp_min} / ${dailyWeatherData[0].temp_max}`}{' '}
              &#8451;
            </p>

            <PreviewImage watch={watch} />
            <form id="write-wear" onSubmit={onSubmit(handleSubmit)}>
              <input
                type="file"
                accept="image/*"
                {...register('image', { required: '이미지는 필수입니다.' })}
              />
              {errors.image && <small role="alert">{errors.image.message}</small>}
              <textarea
                placeholder="기록해보세요.(140자 이내)"
                {...register('description', {
                  maxLength: { value: 140, message: '140자 이내로 작성해주세요.' },
                })}
              />
              {errors.description && <small role="alert">{errors.description.message}</small>}
            </form>
          </DrawerBody>

          <DrawerFooter>
            <Button type="submit" form="write-wear" disabled={isSubmitting}>
              등록
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <div>
        <img src={userData?.user?.image || ''} />
        <p>어서오세요 {userData?.user?.name || ''}님!</p>
      </div>

      <button onClick={onToggle}>오늘의 옷을 등록하러 갈까요?</button>

      <a
        href={`https://openweathermap.org/city/${liveWeatherData?.city_id}`}
        target="_blank"
        rel="noreferrer">
        <div>
          <div>
            {cityNameData?.ko || cityNameData?.en}의 날씨는 {liveWeatherData?.weather.description}
          </div>
          <div>
            <img src={`http://openweathermap.org/img/wn/${liveWeatherData?.weather.icon}@2x.png`} />
          </div>
          <div>
            현재 온도는 {liveWeatherData?.temp}&#8451;, 체감 온도는 {liveWeatherData?.feels_temp}
            &#8451;에요
          </div>
          <div>{liveWeatherData?.time} 기준</div>
        </div>
      </a>

      <div>
        {dailyWeatherStatus === 'success' &&
          dailyWeatherData.map((daily, idx) => (
            <div key={idx}>
              <span>{idx === 0 ? '오늘' : daily.time}</span>
              <span>
                <img src={`http://openweathermap.org/img/wn/${daily.weather.icon}@2x.png`} />
              </span>
              <span>
                {daily.temp_min} / {daily.temp_max} &#8451;
              </span>
            </div>
          ))}
      </div>
    </>
  );
};

export default Main;
