type GetAddressByLatLngResponse = {
  documents: Array<{ address_name: string }>;
};

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
  });

  return response.json();
};
