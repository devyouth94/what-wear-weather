import { type NextRequest, NextResponse } from 'next/server';

import {
  ultraSrtFcstAdapter,
  ultraSrtNcstAdapter,
  vilageFcstAdapter,
} from '~/src/adapters/weather';
import { getAddressByLatLng } from '~/src/apis/geocoding';
import {
  getUltraSrtFcst,
  getUltraSrtNcst,
  getVilageFcst,
} from '~/src/apis/weather';
import { convertLatLngToXY } from '~/src/utils/coordinate';
import {
  calculateFeelsLikeTemp,
  convertCodeToWeather,
} from '~/src/utils/weather';

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');
  const baseDate = searchParams.get('baseDate');

  if (!latitude || !longitude || !baseDate) {
    return NextResponse.json(
      { message: '위치 정보가 필요합니다.' },
      { status: 400 },
    );
  }

  const { x, y } = convertLatLngToXY(Number(latitude), Number(longitude));
  const date = new Date(baseDate);

  try {
    const [
      addressResponse,
      ultraSrtNcstResponse,
      ultraSrtFcstResponse,
      vilageFcstResponse,
    ] = await Promise.all([
      getAddressByLatLng(Number(latitude), Number(longitude)),
      getUltraSrtNcst(x, y, date),
      getUltraSrtFcst(x, y, date),
      getVilageFcst(x, y, date),
    ]);

    const ultraSrtNcstData = ultraSrtNcstAdapter(ultraSrtNcstResponse);
    const ultraSrtFcstData = ultraSrtFcstAdapter(ultraSrtFcstResponse);
    const vilageFcstData = vilageFcstAdapter(vilageFcstResponse);

    const returnResponse = {
      location: addressResponse.documents[0].address_name,
      weather: convertCodeToWeather(ultraSrtFcstData, ultraSrtNcstData.PTY),
      temp: Math.round(Number(ultraSrtNcstData.T1H)),
      temp_min: Math.round(Number(vilageFcstData[0].TMN)),
      temp_max: Math.round(Number(vilageFcstData[0].TMX)),
      temp_feels: calculateFeelsLikeTemp(
        Number(ultraSrtNcstData.T1H),
        Number(ultraSrtNcstData.WSD),
        Number(ultraSrtNcstData.REH),
        date,
      ),
    };

    return NextResponse.json(returnResponse, { status: 200 });
  } catch (error) {
    console.error('실시간 날씨 정보 오류:', error);

    return NextResponse.json(
      { message: '실시간 날씨 정보를 불러오지 못했습니다.' },
      { status: 500 },
    );
  }
};
