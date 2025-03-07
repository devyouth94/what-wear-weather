import { format } from 'date-fns';

import { getPreviousTime } from '~/src/utils/date';

type GetUltraSrtNcstResponse = {
  response: {
    body: {
      items: {
        item: Array<{
          category: string;
          obsrValue: string;
        }>;
      };
    };
  };
};

type GetUltraSrtFcstResponse = {
  response: {
    body: {
      items: {
        item: Array<{
          category: string;
          fcstDate: string;
          fcstTime: string;
          fcstValue: string;
        }>;
      };
    };
  };
};

type GetVilageFcstResponse = {
  response: {
    body: {
      items: {
        item: Array<{
          category: string;
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
          [key: string]: number;
        }>;
      };
    };
  };
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
    ['numOfRows', '1000'],
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
