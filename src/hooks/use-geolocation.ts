import { useEffect, useState } from 'react';

const useGeolocation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [latAndLng, setLatAndLng] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setIsLoading(false);
      console.error('위치 정보를 지원하지 않는 브라우저에요.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setIsLoading(false);
        setLatAndLng({
          latitude: Math.floor(coords.latitude * 10000) / 10000,
          longitude: Math.floor(coords.longitude * 10000) / 10000,
        });
      },
      (error) => {
        setIsLoading(false);
        console.error(
          `위치 정보를 가져오는데 실패했어요. 에러코드: ${error.code}`,
        );
      },
    );
  }, []);

  return { isLoading, latAndLng };
};

export default useGeolocation;
