type GetAddressByLatLngResponse = {
  documents: Array<{ address_name: string }>;
};

export const getAddressByLatLng = async (
  lat: number,
  lng: number,
): Promise<GetAddressByLatLngResponse> => {
  const response = await fetch(
    `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lng}&y=${lat}`,
    {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    },
  );

  return response.json();
};
