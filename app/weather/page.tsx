'use client';

import { useEffect } from 'react';

import { getAddressByLatLng } from '~/src/apis/geocoding';
import { getUltraShortTermForecast } from '~/src/apis/weather';
import { convertLatLngToXY } from '~/src/utils/convert-coordination';
import { convertAddressToRegionCode } from '~/src/utils/convert-region-code';

const Weather = () => {
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('이 브라우저는 위치 정보를 지원하지 않습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;

        const { x, y } = convertLatLngToXY(latitude, longitude);

        const data = await getUltraShortTermForecast(x, y);
        console.log(data.response.body.items.item);

        try {
          const data = await getAddressByLatLng(latitude, longitude);

          const addressName = data.documents[1].address_name;
          const regionCode = convertAddressToRegionCode(addressName);
          console.log({ x, y, addressName, regionCode });
        } catch (error) {
          console.error(error);
        }
      },
      (error) => {
        console.error(error.message);
      },
    );
  }, []);

  return <div>Weather</div>;
};

export default Weather;
