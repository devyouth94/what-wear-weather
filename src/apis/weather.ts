import { format } from 'date-fns';

import { getPreviousTime } from '~/src/utils/date';

export type UltraSrtNcstCategory = 'T1H' | 'REH' | 'WSD' | 'PTY';
export type UltraSrtFcstCategory = 'SKY';
export type VilageFcstCategory = 'TMX' | 'TMN' | 'SKY' | 'PTY';

export type GetCurrentWeatherResponse = {
  location: string;
  weather: string;
  temp: number;
  temp_feels: number;
  temp_min: number;
  temp_max: number;
};

export type GetForecastResponse = Array<{
  day: number;
  temp_min: number;
  temp_max: number;
  weather: string;
}>;

export type GetUltraSrtNcstResponse = {
  response: {
    body: {
      items: {
        item: Array<{
          category: UltraSrtNcstCategory;
          obsrValue: string;
        }>;
      };
    };
  };
};

export type GetUltraSrtFcstResponse = {
  response: {
    body: {
      items: {
        item: Array<{
          category: UltraSrtFcstCategory;
          fcstDate: string;
          fcstTime: string;
          fcstValue: string;
        }>;
      };
    };
  };
};

export type GetVilageFcstResponse = {
  response: {
    body: {
      items: {
        item: Array<{
          category: VilageFcstCategory;
          fcstDate: string;
          fcstTime: string;
          fcstValue: string;
        }>;
      };
    };
  };
};

type GetMidTaResponse = {
  response: {
    body: {
      items: {
        item: Array<{
          [key: string]: number;
        }>;
      };
    };
  };
};

type GetMidLandFcstResponse = {
  response: {
    body: {
      items: {
        item: Array<{
          [key: string]: string;
        }>;
      };
    };
  };
};

export const getCurrentWeather = async (
  latitude: number,
  longitude: number,
  baseDate: string,
): Promise<GetCurrentWeatherResponse> => {
  const url = '/api/weather/current';
  const params = new URLSearchParams([
    ['latitude', latitude.toString()],
    ['longitude', longitude.toString()],
    ['baseDate', baseDate],
  ]);

  const response = await fetch(`${url}?${params.toString()}`);
  return response.json();
};

export const getCurrentForecast = async (
  latitude: number,
  longitude: number,
  baseDate: string,
) => {
  const url = '/api/weather/forecast';
  const params = new URLSearchParams([
    ['latitude', latitude.toString()],
    ['longitude', longitude.toString()],
    ['baseDate', baseDate],
  ]);

  const response = await fetch(`${url}?${params.toString()}`);
  return response.json();
};

const serviceKey = process.env.NEXT_PUBLIC_KMA_API_KEY!;

// 초단기 실황 조회
export const getUltraSrtNcst = async (
  x: number,
  y: number,
  baseDate: Date,
): Promise<GetUltraSrtNcstResponse> => {
  const url =
    'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
  const params = new URLSearchParams([
    ['serviceKey', serviceKey],
    ['pageNo', '1'],
    ['numOfRows', '1000'],
    ['dataType', 'JSON'],
    ['base_date', format(baseDate, 'yyyyMMdd')],
    ['base_time', getPreviousTime(baseDate, 'ultraSrtNcst')],
    ['nx', x.toString()],
    ['ny', y.toString()],
  ]);

  const response = await fetch(`${url}?${params.toString()}`);
  return response.json();
};

// 초단기 예보 조회
export const getUltraSrtFcst = async (
  x: number,
  y: number,
  baseDate: Date,
): Promise<GetUltraSrtFcstResponse> => {
  const url =
    'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst';
  const params = new URLSearchParams([
    ['serviceKey', serviceKey],
    ['pageNo', '1'],
    ['numOfRows', '1000'],
    ['dataType', 'JSON'],
    ['base_date', format(baseDate, 'yyyyMMdd')],
    ['base_time', getPreviousTime(baseDate, 'ultraSrtFcst')],
    ['nx', x.toString()],
    ['ny', y.toString()],
  ]);

  const response = await fetch(`${url}?${params.toString()}`);
  return response.json();
};

// 단기 예보 조회
export const getVilageFcst = async (
  x: number,
  y: number,
  baseDate: Date,
): Promise<GetVilageFcstResponse> => {
  const url =
    'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
  const params = new URLSearchParams([
    ['serviceKey', serviceKey],
    ['pageNo', '1'],
    ['numOfRows', '932'],
    ['dataType', 'JSON'],
    ['base_date', format(baseDate, 'yyyyMMdd')],
    ['base_time', '0200'],
    ['nx', x.toString()],
    ['ny', y.toString()],
  ]);

  const response = await fetch(`${url}?${params.toString()}`);
  return response.json();
};

// 중기 기온 조회
export const getMidTa = async (
  regId: string,
  baseDate: Date,
): Promise<GetMidTaResponse> => {
  const url = 'https://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa';
  const params = new URLSearchParams([
    ['serviceKey', serviceKey],
    ['pageNo', '1'],
    ['numOfRows', '1000'],
    ['dataType', 'JSON'],
    ['regId', regId],
    ['tmFc', `${format(baseDate, 'yyyyMMdd')}0600`],
  ]);

  const response = await fetch(`${url}?${params.toString()}`);
  return response.json();
};

// 중기 육상 예보 조회
export const getMidLandFcst = async (
  regId: string,
  baseDate: Date,
): Promise<GetMidLandFcstResponse> => {
  const url =
    'https://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst';
  const params = new URLSearchParams([
    ['serviceKey', serviceKey],
    ['pageNo', '1'],
    ['numOfRows', '1000'],
    ['dataType', 'JSON'],
    ['regId', regId],
    ['tmFc', `${format(baseDate, 'yyyyMMdd')}0600`],
  ]);

  const response = await fetch(`${url}?${params.toString()}`);
  return response.json();
};
