type GetAddressByLatLngResponse = {
  documents: Array<{ address_name: string }>;
};

const A_WEEK = 60 * 60 * 24 * 7;

export const getAddressByLatLng = async (
  latitude: number,
  longitude: number,
): Promise<GetAddressByLatLngResponse> => {
  const url = 'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json';
  const params = new URLSearchParams([
    ['x', longitude.toString()],
    ['y', latitude.toString()],
  ]);

  const response = await fetch(`${url}?${params.toString()}`, {
    method: 'GET',
    headers: {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
    },
    next: {
      revalidate: A_WEEK,
    },
  });

  return response.json();
};
