import { get } from '~/src/utils/api';

type GetAddressByLatLngResponse = {
  documents: Array<{ address_name: string }>;
};

const A_WEEK = 60 * 60 * 24 * 7;

export const getAddressByLatLng = async (latitude: string, longitude: string) =>
  get<GetAddressByLatLngResponse>(
    'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json',
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
      params: { x: longitude, y: latitude },
      next: { revalidate: A_WEEK },
    },
  );
