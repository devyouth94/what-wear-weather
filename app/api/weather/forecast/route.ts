import { type NextRequest, NextResponse } from 'next/server';

import { vilageFcstAdapter } from '~/src/adapters/weather';
import { getAddressByLatLng } from '~/src/apis/geocoding';
import { getMidLandFcst, getMidTa, getVilageFcst } from '~/src/apis/weather';
import { convertLatLngToXY } from '~/src/utils/coordinate';
import {
  convertAddressToLandForecastCode,
  convertAddressToRegionCode,
} from '~/src/utils/region-code';
import { convertCodeToIcon, convertWeatherToCode } from '~/src/utils/weather';

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');

  if (!latitude || !longitude) {
    return NextResponse.json(
      { message: '위치 정보가 필요합니다.' },
      { status: 400 },
    );
  }

  const { x, y } = convertLatLngToXY(Number(latitude), Number(longitude));
  const date = new Date();

  try {
    const location = await getAddressByLatLng(latitude, longitude);

    const address = location.documents[0].address_name;

    const [vilageFcstResponse, midTaResponse, midLandFcstResponse] =
      await Promise.all([
        getVilageFcst(x, y, date),
        getMidTa(convertAddressToRegionCode(address), date),
        getMidLandFcst(convertAddressToLandForecastCode(address), date),
      ]);

    const vilageFcstData = vilageFcstAdapter(vilageFcstResponse);
    const midTaData = midTaResponse.response.body.items.item;
    const midLandFcstData = midLandFcstResponse.response.body.items.item;

    const forecastData = [
      ...[1, 2, 3, 4].map((day) => ({
        day,
        temp_min: Math.round(Number(vilageFcstData[day - 1].TMN)),
        temp_max: Math.round(Number(vilageFcstData[day - 1].TMX)),
        weather: convertCodeToIcon(
          vilageFcstData[day - 1].SKY,
          vilageFcstData[day - 1].PTY,
        ),
      })),
      ...[5, 6, 7, 8].map((day) => ({
        day,
        temp_min: Math.round(Number(midTaData[0][`taMin${day - 1}`])),
        temp_max: Math.round(Number(midTaData[0][`taMax${day - 1}`])),
        weather: convertWeatherToCode(midLandFcstData[0][`wf${day - 1}Am`]),
      })),
    ];

    return NextResponse.json(
      {
        data: forecastData,
        temp_week_min: Math.min(...forecastData.map((item) => item.temp_min)),
        temp_week_max: Math.max(...forecastData.map((item) => item.temp_max)),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('예보 정보 조회 오류:', JSON.stringify(error, null, 2));

    return NextResponse.json(
      { message: '예보 정보를 불러오지 못했습니다.' },
      { status: 500 },
    );
  }
};
