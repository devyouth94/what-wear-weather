import { kmaApi } from '~/src/utils/api';
import {
  formatKoreanTime,
  getPreviousDate,
  getPreviousTime,
} from '~/src/utils/date';

export type UltraSrtNcstCategory = 'T1H' | 'REH' | 'WSD' | 'PTY';
export type UltraSrtFcstCategory = 'SKY';
export type VilageFcstCategory = 'TMX' | 'TMN' | 'SKY' | 'PTY';

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

const TEN_MINUTES = 600;

const serviceKey = process.env.NEXT_PUBLIC_KMA_API_DECODING_KEY!;

// 초단기 실황 조회
export const getUltraSrtNcst = async (x: number, y: number, baseDate: Date) =>
  kmaApi<GetUltraSrtNcstResponse>(
    'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst',
    {
      params: {
        serviceKey,
        pageNo: '1',
        numOfRows: '1000',
        dataType: 'JSON',
        base_date: formatKoreanTime(baseDate, 'yyyyMMdd'),
        base_time: getPreviousTime(baseDate, 'ultraSrtNcst'),
        nx: x,
        ny: y,
      },
      next: { revalidate: TEN_MINUTES },
    },
  );

// 초단기 예보 조회
export const getUltraSrtFcst = async (x: number, y: number, baseDate: Date) =>
  kmaApi<GetUltraSrtFcstResponse>(
    'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst',
    {
      params: {
        serviceKey,
        pageNo: '1',
        numOfRows: '1000',
        dataType: 'JSON',
        base_date: formatKoreanTime(baseDate, 'yyyyMMdd'),
        base_time: getPreviousTime(baseDate, 'ultraSrtFcst'),
        nx: x,
        ny: y,
      },
      next: { revalidate: TEN_MINUTES },
    },
  );

// 단기 예보 조회
export const getVilageFcst = async (x: number, y: number, baseDate: Date) =>
  kmaApi<GetVilageFcstResponse>(
    'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst',
    {
      params: {
        serviceKey,
        pageNo: '1',
        numOfRows: '1000',
        dataType: 'JSON',
        base_date: getPreviousDate(baseDate, 'vilage'),
        base_time: '0200',
        nx: x,
        ny: y,
      },
      next: { revalidate: TEN_MINUTES },
    },
  );

// 중기 기온 조회
export const getMidTa = async (regId: string, baseDate: Date) =>
  kmaApi<GetMidTaResponse>(
    'https://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa',
    {
      params: {
        serviceKey,
        pageNo: '1',
        numOfRows: '1000',
        dataType: 'JSON',
        regId,
        tmFc: `${getPreviousDate(baseDate, 'mid')}0600`,
      },
      next: { revalidate: TEN_MINUTES },
    },
  );

// 중기 육상 예보 조회
export const getMidLandFcst = async (regId: string, baseDate: Date) =>
  kmaApi<GetMidLandFcstResponse>(
    'https://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst',
    {
      params: {
        serviceKey,
        pageNo: '1',
        numOfRows: '1000',
        dataType: 'JSON',
        regId,
        tmFc: `${getPreviousDate(baseDate, 'mid')}0600`,
      },
      next: { revalidate: TEN_MINUTES },
    },
  );
