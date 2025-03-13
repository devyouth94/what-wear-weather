import { type NextRequest, NextResponse } from 'next/server';

import { vilageFcstAdapter } from '~/src/adapters/weather';
import { getAddressByLatLng } from '~/src/apis/geocoding';
import {
  type GetForecastResponse,
  getMidLandFcst,
  getMidTa,
  getVilageFcst,
} from '~/src/apis/weather';
import { convertLatLngToXY } from '~/src/utils/coordinate';
import {
  convertAddressToLandForecastCode,
  convertAddressToRegionCode,
} from '~/src/utils/region-code';
import { convertCodeToWeather } from '~/src/utils/weather';

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');
  const baseDate = searchParams.get('baseDate');

  if (!latitude || !longitude || !baseDate) {
    return NextResponse.json(
      { error: '위치 정보가 필요합니다.' },
      { status: 400 },
    );
  }

  const { x, y } = convertLatLngToXY(Number(latitude), Number(longitude));
  const date = new Date(baseDate);

  try {
    const location = await getAddressByLatLng(
      Number(latitude),
      Number(longitude),
    );

    const address = location.documents[0].address_name;

    const [vilageFcstResponse, midTaResponse, midLandFcstResponse] =
      await Promise.all([
        getVilageFcst(x, y, date),
        getMidTa(convertAddressToRegionCode(address)!, date),
        getMidLandFcst(convertAddressToLandForecastCode(address)!, date),
      ]);

    const vilageFcstData = vilageFcstAdapter(vilageFcstResponse);
    const midTaData = midTaResponse.response.body.items.item;
    const midLandFcstData = midLandFcstResponse.response.body.items.item;

    const returnResponse: GetForecastResponse = [
      ...[1, 2, 3, 4].map((day) => ({
        day,
        temp_min: Math.round(Number(vilageFcstData[day - 1].TMN)),
        temp_max: Math.round(Number(vilageFcstData[day - 1].TMX)),
        weather: convertCodeToWeather(
          vilageFcstData[day - 1].SKY,
          vilageFcstData[day - 1].PTY,
        ),
      })),
      ...[5, 6, 7, 8].map((day) => ({
        day,
        temp_min: Math.round(Number(midTaData[0][`taMin${day - 1}`])),
        temp_max: Math.round(Number(midTaData[0][`taMax${day - 1}`])),
        weather: midLandFcstData[0][`wf${day - 1}Am`],
      })),
    ];

    return NextResponse.json(returnResponse, { status: 200 });
  } catch (error) {
    console.error('예보 정보 오류:', error);

    return NextResponse.json(
      { error: '예보 정보를 불러오지 못했습니다.' },
      { status: 500 },
    );
  }
};
